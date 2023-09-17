import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../newBooking/newBookingForm.css';
import { BsArrowDownUp } from "react-icons/bs";

import NavigationBar from '../navigation/NavigationBar';
import Seat from '../newBooking/Seat'
import { useNavigate } from 'react-router-dom';

const NewBookingForm = () => {
  const navigate = useNavigate();
  const bookingvalues = { passengerName: "", from: "", destination: "", seatNumber: "", bookingTime: "" }
  const [formValues, useFormvalues] = useState(bookingvalues)
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    const { passengerName, value } = e.target;
    useFormvalues({ ...formValues, [passengerName]: value });
  };






  const [from, setFrom] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    const temp = from;
    setFrom(destination);
    setDestination(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToBackend();
    setIsSubmit(true);

    // Validate the form inputs
    if (from === '' || destination === '') {
      setError('Please fill in all the fields.');
      return;
    }

    // Clear the error state
    setError('');

    // Display toast notification
    toast.success('Your ticket was booked');
  };

  // send data to Database
  const sendDataToBackend = async () => {


    try {
      const response = await fetch('https://better-bikini-tick.cyclic.cloud/api/v2/seats/seats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        throw new Error('Failed to save data');
      }


    } catch (error) {
      console.error('Error saving data:', error);
    }
  };




  return (
    <div className='all'>
      <NavigationBar />
      <div className="Bcontainer">
        <form className="form" onSubmit={handleSubmit}>
          <header id="Chead">Book your ticket</header>

          {error && <p className="error">{error}</p>}
          <header id="Btitle">enter your username</header>
          <input type='text' placeholder="enter your Names" id='first'
            // value={formValues.passengerName}
            onChange={handleChange}
          />

          <label id="beyond">
            <h1 id="Btitle">From:</h1>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              id="input-form1"
            >
              <option id="design" value="">Select</option>
              <option id="design" value="Kanombe">Kanombe</option>
              <option id="design" value="Kimirinko">Kimirinko</option>
              <option id="design" value="Kicukiro">Kicukiro</option>
              <option id="design" value="Downtown">Downtown</option>
              <option id="design" value="Nyamirambo">Nyamirambo</option>
              value={formValues.from}
              onChange={handleChange}
            </select>
          </label>

          <div className='vice-versa'>
            <BsArrowDownUp id='arrow' onClick={handleClick} />
          </div>

          <label id="beyond">
            <h1 id="Btitle">Destination:</h1>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              id="input-form1"
            >
              <option id="design" value="">Select</option>
              <option id="design" value="Ruyenzi">Ruyenzi</option>
              <option id="design" value="Kacyiru">Kacyiru</option>
              <option id="design" value="Remera">Remera</option>
              <option id="design" value="Kabuga">Kabuga</option>
              <option id="design" value="Gikondo">Gikondo</option>
              value={formValues.destination}
              onChange={handleChange}


            </select>
          </label>

          <label id="beyond">
            <h1 id="Btitle">Time:</h1>
            <select id="input-form1">
              <option id="design" value="">Select</option>
              <option id="design" value="Ruyenzi">8:00am</option>
              <option id="design" value="Kacyiru">9:00am</option>
              <option id="design" value="Remera">10:00am</option>
              <option id="design" value="Kabuga">11:00am</option>
              <option id="design" value="Gikondo">12:00am</option>
              value={formValues.bookingTime}
              onChange={handleChange}
            </select>
          </label>

          <label id="beyond">
            <h1 id="Btitle">choose seat number</h1>
            <select id="input-form1">
              <option id="design" value="">Select</option>
              <option id="design" value="1">1</option>
              <option id="design" value="2">2</option>
              <option id="design" value="3">3</option>
              <option id="design" value="4">4</option>
              <option id="design" value="5">5</option>
              value={formValues.seatNumber}
              onChange={handleChange}
            </select>
          </label>

          <button type="submit" id="btn">Book Ticket</button>
        </form>
        <Seat />
      </div>

      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
};

export default NewBookingForm;
