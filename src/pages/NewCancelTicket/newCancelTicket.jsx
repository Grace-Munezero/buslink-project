import "../NewCancelTicket/newCancelTicket.css";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

import { BsFillBusFrontFill } from "react-icons/bs";
import NavBar from "../navigation/NavigationBar";

class NewCancelTicketPage extends React.Component {
  handleCancelTicket = () => {
    // integrate  cancel ticket logic here
    toast.success("ticket has been cancelled");
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="cancel-container">
          <h1 className="title1">Bus Ticket Booking Online</h1>
          <p id="sub-title">
            Bus link makes it easy for booking <BsFillBusFrontFill id="bus" />
          </p>
          <div className="sub-container">
            <div className="option1">
              <input type="text" placeholder="From" className="from1" />
            </div>
            <div className="option2">
              <input type="text" placeholder="To" className="from2" />
            </div>
            <div className="option3">
              <select className="from">
                <option value="08:00">8:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="18:00">6:00 PM</option>
              </select>
            </div>
            <div className="btn">
              <button
                className="cancel-ticket"
                onClick={this.handleCancelTicket}
              >
                Cancel Ticket
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default NewCancelTicketPage;
