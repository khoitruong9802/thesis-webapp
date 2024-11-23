// Import necessary libraries and CSS
import React from "react";
import "./Dashboard.css";
import { Chart } from "react-chartjs-2";

function Dashboard() {
  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       fill: false,
  //       backgroundColor: "rgb(75, 192, 192)",
  //       borderColor: "rgba(75, 192, 192, 0.2)",
  //     },
  //   ],
  // };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-menu">
          <li className="menu-item">Home</li>
          <li className="menu-item">Dashboard</li>
          <li className="menu-item">Settings</li>
          <li className="menu-item">Profile</li>
          <li className="menu-item">Logout</li>
        </ul>
      </div>

      <div className="dashboard-container">
        <h1 className="header-title">Dashboard</h1>

        <div className="card-container">
          <div className="card">
            <div className="value normal">28°C</div>
            <div className="label">Temperature</div>
          </div>
          <div className="card">
            <div className="value normal">65%</div>
            <div className="label">Humidity</div>
          </div>
          <div className="card">
            <div className="value normal">40ppm</div>
            <div className="label">Nito</div>
          </div>
          <div className="card">
            <div className="value hot">20ppm</div>
            <div className="label">Photpho</div>
          </div>
          <div className="card">
            <div className="value hot">15ppm</div>
            <div className="label">Kali</div>
          </div>
        </div>

        <div className="tab-and-chart">
          <div className="table-container-das">
            <h1 className="header-title">Recently Table</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Tracking ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Khôi</td>
                  <td>16112024</td>
                  <td>16 November 2024</td>
                  <td className="status-approved">Approved</td>
                </tr>
                <tr>
                  <td>Kiên</td>
                  <td>17112024</td>
                  <td>17 November 2024</td>
                  <td className="status-pending">Pending</td>
                </tr>
                <tr>
                  <td>Sơn</td>
                  <td>18112024</td>
                  <td>18 November 2024</td>
                  <td className="status-approved">Approved</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="chart">
            <h1>Chart</h1>
            {/* <Chart type="line" data={data} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
