import React ,{useEffect,useState}from "react";
import "./booking.css";
import drivers from "../../../src/Driver";
import DriverSidebar from "../../component/Side/driveSidebar";
const Booking = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    
    getDataToBackendDriver();
  }, []);



  const  getDataToBackendDriver = async () => {
    const YOUR_TOKEN = localStorage.getItem('token');
    const response = await fetch('https://better-bikini-tick.cyclic.cloud/api/v2/booking/readAll', {
      method: 'GET',
      headers: {
        Authorization: `bearer ${YOUR_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    let actualData = await response.json();
    console.log(YOUR_TOKEN);
 
    
 
    setData(actualData.data);
    
    console.log("your data",actualData.data);

  };


  return (
    <div className="driverContainer" id="booking-fix-error">
      <div className="sidebar">
        <DriverSidebar />
      </div>
      <div className="driverContent">

        <div className="KicukiroNyabugogoos">

          <span className="driverLocation">Kicukiro - Nyabugogo</span>
        </div>
        <div className="driverTable">
          <table>
            <thead className="table-header">
              <th className="header">No</th>
              <th className="header">Passengers</th>
              <th className="header">Seats Booked</th>
              <th className="header"> Booking Status</th>
            </thead>
            <tbody className="table-body">
              {data ? 
              data.map((item) => (
                <tr className="table-row">
                  <td className="item0">{item.booking_id}</td>
                  <td className="item1">{item.userName}</td>
                  <td className="item2">{item.seat}</td>
                  <td className="item3">
                    <div className="driverHolder">
                      <div className={item.accepted === false ? "box1" : ""}>
                        <span className="deny">Deny</span>
                      </div>
                      <div className={item.accepted === true ? "box2" : ""}>
                        <span className="accept">Accept</span>
                      </div>
                    </div>
                  </td>
                </tr>
              )):""}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Booking;
