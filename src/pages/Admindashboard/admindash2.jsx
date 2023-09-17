import React from "react";
import admindrivers from "../../constants/admindrivers";
import "./admin.css";
import Sidebar from "../../component/sidebar";
import { useState, useEffect } from "react";
import Axios from "axios";

const Admin1 = () => {
  const [data, setData] = useState([]);

  const [drivers, setDrivers] = useState(admindrivers);
  const toggleActions = (index) => {
    setDrivers((prevDrivers) => {
      const updatedDrivers = [...prevDrivers];
      updatedDrivers[index] = {
        ...updatedDrivers[index],
        Actions: !updatedDrivers[index].Actions,
      };
      return updatedDrivers;
    });
  };

  const getData = async () => {
    const response = await Axios.get(
      `https://better-bikini-tick.cyclic.cloud/api/v2/role/readAll?role=Driver`
    );
    setData[response.data.data];
    console.log(response.data.data);
  };

  const [driverData, setDriverData] = useState([]);
  useEffect(() => {
    fetch(
      "https://better-bikini-tick.cyclic.cloud/api/v2/role/readAll?role=Driver"
    )
      .then((response) => response.json())
      .then((data) => setDriverData(data.data))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    getData();
  }, []);
  // console.log(data);

  //   useEffect(() => {
  //     getData();
  //   }, []);
  //    console.log(driverData);

  // return (
  //   <>
  //     <div className="admin-container">
  //       <Sidebar />

  return (
    <>
      <div className="admin-container">
        <div className="cont-side">
          <Sidebar />
        </div>

        <div className="admin-content">
          <div className="upper-part">
            <div className="part-one">
              <h4>
                WELCOME <span style={{ color: "#009AC7" }}> Admin.</span>
              </h4>
            </div>
            <div className="upbar">
              <div className="upicons">
                <i className="bx bx-search"></i>
                <i className="bx bx-bell"></i>
              </div>
              <div className="vertical"></div>
              <div className="credential">
                <h5>Tristan</h5>
                <p>tristanboo9@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="line2"></div>
          <div className="drivers">
            <h2>Drivers</h2>
            <div className="cards">
              <div className="card1">
                <div className="first">
                  <h2>Active drivers</h2>
                  <p style={{ color: "#009AC7" }}>20</p>
                </div>
                <div className="icon" style={{ color: "#009AC7" }}>
                  <i className="bx bx-check-circle"></i>
                </div>
              </div>
              <div className="card2">
                <div className="first">
                  <h2>Blocked drivers</h2>
                  <p>5</p>
                </div>
                <div className="icon">
                  <i className="bx bx-x-circle"></i>
                </div>
              </div>
            </div>
            <h4>All drivers</h4>
            <div className="container-driver">
              <div className="table">
                <table>
                  <thead className="table-header">
                    <th className="header">Name</th>
                    <th className="header">Contact</th>
                    <th className="header">Status</th>
                    <th className="header">Actions</th>
                  </thead>
                  <tbody className="table-body">
                    {driverData.map((driver, index) => {
                      return (
                        <>
                          {index < 20 ? (
                            <>
                              <tr className="table-row"></tr>
                              <td className="item1">{driver.userName}</td>
                              <td className="item2">{driver.email}</td>
                              <td className="item2">{driver.status}</td>
                              <td className="item2">{index + 1}</td>
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                    {/* {admindrivers.map((item) => (
                      <tr className="table-row">
                        <td className="item3">
                          <div className="holder ">
                            <div
                              className={item.Actions === false ? "box1" : ""}
                            >
                              <span className="block">Block</span>
                            </div>
                            <div
                              className={item.Actions === true ? "box2" : ""}
                            >
                              <span className="unblock">Unblock</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin1;
