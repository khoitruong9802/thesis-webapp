import mongoose from "mongoose";
import { Station } from "../models/StationModel.js"
import { ManageStation } from "../models/ManageStationModel.js"
import { User } from "../models/UserModel.js";

export const getAllStation = async (req, res) => {
  try {
    // Find manage stations for the user
    const manageStations = await ManageStation.find({
      user: req.userId
    });

    const stations = await Promise.all(
      manageStations.map(async (item) => {
        return await Station.findById(item.station)
      })
    )

    // Send the response with the resolved station data
    res.status(200).json(stations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}

export const getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.station_id);
    if (!station) {
      return res.status(400).json({ message: "Station not found" });
    }
    res.status(200).json(station);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createStation = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Perform your database operations within the transaction
    const newStation = req.body;

    const station = new Station(newStation);
    await station.save();

    const newManageStation = {
      role: "admin",
      user: req.userId,
      station: station._id
    }

    const manageStation = new ManageStation(newManageStation);
    await manageStation.save();

    // Commit the transaction
    await session.commitTransaction();
    res.status(200).json(station);

  } catch (error) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    console.error('Transaction aborted due to error:', error);
    res.status(400).json({ message: error.message });

  } finally {
    session.endSession();
  }
}

export const updateStation = async (req, res) => {
  try {
    const updateStation = req.body;

    const manageStation = await ManageStation.findOne({
      user: req.userId,
      station: req.params.station_id
    })
    if (!manageStation) {
      return res.status(400).json({ message: "Station not found" });
    }

    const station = await Station.findByIdAndUpdate(req.params.station_id, req.body, { new: true, runValidators: true });
    if (!station) {
      return res.status(400).json({ message: "Station not found" });
    }

    res.status(200).json(station);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteStation = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Perform your database operations within the transaction
    const station = await Station.findByIdAndDelete(req.params.station_id);

    const manageStation = await ManageStation.deleteMany({
      station: req.params.station_id,
    })

    if (!station || !manageStation) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Station not found" });
    }
    // Commit the transaction
    await session.commitTransaction();
    res.status(200).json({ message: "Station deleted" });

  } catch (error) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    console.error('Transaction aborted due to error:', error);
    res.status(400).json({ message: error.message });

  } finally {
    session.endSession();
  }
}

export const getMemberByStationId = async (req, res) => {
  try {
    // Find manage stations for the user
    const manageStations = await ManageStation.find({
      station: req.params.station_id
    }).populate("user");

    const members = manageStations.map(item => (
      {
        full_name: item.user.full_name,
        role: item.role
      }
    ))

    // Send the response with the resolved station data
    res.status(200).json(members);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}

export const addMemberByStationId = async (req, res) => {
  try {
    const isAdmin = await ManageStation.findOne({
      user: req.userId,
      station: req.params.station_id
    })

    if (isAdmin?.role !== "admin") {
      return res.status(400).json({ message: "You are not admin of this station" });
    }

    const user = await User.findOne({
      username: req.body.username
    })
    if (!user) {
      return res.status(400).json({ message: "This username does not exist." });
    }

    const manageStation = new ManageStation({
      role: "admin",
      station: req.params.station_id,
      user: user._id
    });
    await manageStation.save();

    res.status(200).json(manageStation);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}