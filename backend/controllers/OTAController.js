import fs from "fs";
import path from "path";
import { __dirname } from "../utils/helper.js";

// Helper function to get the latest version
function getCurrentVersion(directory) {
  const files = fs.readdirSync(directory);
  const versions = files.map((file) => {
    const match = file.match(/Version (\d+\.\d+)/);
    return match ? parseFloat(match[1]) : 0;
  });
  return Math.max(...versions, 1.0); // Start at version 1.0 if none exist
}

// Serve the list of uploaded files on GET /upload
export const getUpload = (req, res) => {
  const uploadDir = path.join(__dirname, "uploads");

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }

    // Sort files by modification time (newest first)
    files.sort((a, b) => {
      return (
        fs.statSync(path.join(uploadDir, b)).mtime -
        fs.statSync(path.join(uploadDir, a)).mtime
      );
    });

    // let fileList = files
    //   .map((file) => `<li><a href="/uploads/${file}">${file}</a></li>`)
    //   .join("");
    // const html = `
    //   <h1>Uploaded Files</h1>
    //   <ul>${fileList}</ul>
    // `;

    let otaUpdates = files.map((file, index) => {
      const filePath = path.join(uploadDir, file);
      const stats = fs.statSync(filePath);
      const timestamp = new Date(stats.mtime).toLocaleString(); // Get last modified time
      const version = file.split("_")[0]; // Extract version from filename

      return {
        id: index + 1, // Assign the latest file as id=1
        date: timestamp,
        version: version,
      };
    });

    // res.send(html);
    res.json(otaUpdates);
  });
};

// Handle file uploads with timestamp renaming
export const postUpload = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const uploadedFile = req.files.file;
  const uploadDir = path.join(__dirname, "uploads");

  // Get current version and increment it by 0.1
  let currentVersion = getCurrentVersion(uploadDir);
  let newVersion = (parseFloat(currentVersion) + 0.1).toFixed(1);

  // Generate new filename with the current timestamp
  // const timestamp = getCurrentTimestamp();
  // const newFileName = `${timestamp}_firmware.bin`;
  // const newVersion = (parseFloat(currentVersion) + 0.1).toFixed(1);
  // const newFileName = `Version ${newVersion}${path.extname(
  //   file.originalname
  // )}_firmware.bin`;
  // const uploadPath = path.join(__dirname, "uploads", newFileName);

  // Create the new file name with version number, without including the extension
  const newFileName = `Version ${newVersion}`;
  const uploadPath = path.join(uploadDir, `${newFileName}`); // Keep original extension in the actual file

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(`File uploaded and renamed to ${newFileName}`);
  });
};

// Serve the most recent firmware file on GET /latest-firmware
export const getLastestFirmware = (req, res) => {
  const uploadDir = path.join(__dirname, "uploads");

  // Get list of files in the uploads directory
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }

    if (files.length === 0) {
      return res.status(404).send("No firmware files found.");
    }

    // Find the latest file by modification date
    let latestFile = files.reduce((latest, file) => {
      const latestFilePath = path.join(uploadDir, latest);
      const filePath = path.join(uploadDir, file);
      const latestStat = fs.statSync(latestFilePath);
      const fileStat = fs.statSync(filePath);
      return fileStat.mtime > latestStat.mtime ? file : latest;
    });

    const latestFilePath = path.join(uploadDir, latestFile);
    res.download(latestFilePath, (err) => {
      if (err) {
        return res.status(500).send("Error sending file: " + err);
      }
    });
  });
};
