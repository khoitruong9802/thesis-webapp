const OTAVersion = ({ updates }) => {
  const handleDownload = (fileName) => {
    const fileUrl = `/uploads/${fileName}`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>OTA Updated Lists</h1>
      <div className="ota-list">
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Date & Time</th>
              <th>Version</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {updates.map((update) => (
              <tr key={update.id}>
                <td>{update.id}</td>
                <td>{update.date}</td>
                <td>{update.version}</td>
                <td>
                  {/* download */}
                  <button onClick={() => handleDownload(update.fileName)}>
                    <i className="fa fa-download"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OTAVersion;
