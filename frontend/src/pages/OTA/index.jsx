import { useState, useEffect } from "react";
import "./OTA.css"; // Import file CSS
import OTAVersion from "./OTAVersion";
import { getVersion, uploadFile } from "../../services/OTAService";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [updates, setUpdates] = useState([]);

  const fetchVersion = async () => {
    // Fetch the JSON data from the backend
    try {
      const res = await getVersion();
      setUpdates(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching updates:", error);
    }
  };

  useEffect(() => {
    fetchVersion();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Gửi request với file lên server
    try {
      const res = await uploadFile(formData);
      alert("File uploaded successfully!");
      fetchVersion();
      console.log(res);
    } catch (error) {
      alert("File upload failed!");
    }
  };

  return (
    <div className="flex items-center justify-center gap-x-32 h-screen w-full">
      <div className="table-container">
        <OTAVersion updates={updates} />
      </div>

      <div className="upload-container">
        <h1>Upload Your OTA Version</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {selectedFile && <p>File selected: {selectedFile.name}</p>}
      </div>
    </div>
  );
}

export default FileUpload;
