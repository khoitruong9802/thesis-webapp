import { useEffect, useState } from "react";
import { getStation, createStation } from "../../services/stationService";
import Modal from "../../components/Modal"
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setStation, setSelectedStation } from "../../store/slices/stationSlice";

const Station = ({ id, name, selected }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(setSelectedStation(id));
      }}
      className={`flex border-2 ${selected ? "from-purple-600 to-blue-400 bg-gradient-to-tr text-white" : "text-purple-800 bg-white"} border-purple-600 rounded-md cursor-pointer justify-center items-center gap-x-2 p-2 hover:scale-105`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
      <div>
        <p className="font-medium">{name}</p>
      </div>
    </div>
  )
}

const StationCreateForm = ({ onClose }) => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleForm = async () => {
    console.log(formData)
    setIsLoading(true);
    try {
      const res = await createStation(formData);
      if (res.status === 200) {
        console.log("create ok");
        window.location.reload();
      }
    } catch (error) {
      setErrMessage("Can not create station.");
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Loading isLoading={isLoading}>
      <div className="flex flex-col gap-y-3 p-8 bg-white w-[40rem] rounded-md overflow-auto h-[95%]">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">CREATE STATION</p>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <label htmlFor="title" className="font-bold">
            Station name
          </label>
          <input
            value={formData.name}
            onChange={(event) => setFormData(prev => (
              {
                ...prev,
                name: event.target.value
              }
            ))}
            id="title"
            className="p-3 w-full border-2 border-[#e5e5e5] rounded-sm"
            type="text"
            placeholder="Example: HCMUT Station"
          />
        </div>
        <div>
          <label htmlFor="title" className="font-bold">
            Address
          </label>
          <input
            value={formData.address}
            onChange={(event) => setFormData(prev => (
              {
                ...prev,
                address: event.target.value
              }
            ))}
            id="title"
            className="p-3 w-full border-2 border-[#e5e5e5] rounded-sm"
            type="text"
            placeholder="Example: 268 Ly Thuong Kiet, TPHCM"
          />
        </div>
        <div>
          <label htmlFor="title" className="font-bold">
            Description
          </label>
          <input
            value={formData.description}
            onChange={(event) => setFormData(prev => (
              {
                ...prev,
                description: event.target.value
              }
            ))}
            id="title"
            className="p-3 w-full border-2 border-[#e5e5e5] rounded-sm"
            type="text"
            placeholder="Example: This station is in B9 DHBK"
          />
        </div>
        <div className="flex gap-x-3">
          <div className="w-6/12">
            <label htmlFor="title" className="font-bold">
              Latitude
            </label>
            <input
              value={formData.latitude}
              onChange={(event) => setFormData(prev => (
                {
                  ...prev,
                  latitude: event.target.value
                }
              ))}
              id="title"
              className="p-3 w-full border-2 border-[#e5e5e5] rounded-sm"
              type="number"
              placeholder="Example: 110.129391"
            />
          </div>
          <div className="w-6/12">
            <label htmlFor="title" className="font-bold">
              Longitude
            </label>
            <input
              value={formData.longitude}
              onChange={(event) => setFormData(prev => (
                {
                  ...prev,
                  longitude: event.target.value
                }
              ))}
              id="title"
              className="p-3 w-full border-2 border-[#e5e5e5] rounded-sm"
              type="number"
              placeholder="Example: 10.298402"
            />
          </div>
        </div>

        <button
          onClick={handleForm}
          className="text-white bg-[#0C0D21] hover:shadow-xl self-start p-3 rounded-sm"
        >
          Create station
        </button>
        <p className="text-red-600 text-sm">{errMessage}</p>
      </div>
    </Loading>
  )
}

const StationList = () => {
  const [showStationForm, setShowStationForm] = useState(false);
  const stations = useSelector(state => state.station.value);
  const selectedStation = useSelector(state => state.station.selected);
  const dispatch = useDispatch();

  const closeStationForm = () => {
    setShowStationForm(false);
  }

  useEffect(() => {
    console.log("fetch station")
    const fetchData = async () => {
      try {
        const res = await getStation();
        if (res.status === 200) {
          dispatch(setStation(res.data));
          dispatch(setSelectedStation(res.data[0]._id))
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])

  return (
    <div className="flex flex-col p-4 gap-y-2 bg-gray-100 rounded-lg">

      <div className="flex justify-between items-center">
        <p className="text-xl font-medium">Station</p>
        <button
          onClick={() => {
            setShowStationForm(true);
          }}
          className="bg-gray-200 rounded-lg p-2 aspect-square"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      <div className="flex gap-2 flex-wrap bg-gray-100 rounded-lg">
        {stations.map((item) => (
          <Station key={item._id} id={item._id} name={item.name} description={item.description} selected={item._id === selectedStation} />
        ))}
      </div>
      <Modal isOpen={showStationForm} onClose={closeStationForm}>
        <StationCreateForm onClose={closeStationForm} />
      </Modal>
    </div>
  );
};

export default StationList;