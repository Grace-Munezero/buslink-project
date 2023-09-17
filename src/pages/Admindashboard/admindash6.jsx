import React, { useState, useEffect } from 'react';
import './admin.css';
import Sidebar from '../../component/sidebar';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [newRole, setNewRole] = useState('');
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [rows, setRows] = useState([]);
  let reversedArray = [];

  useEffect(() => {
    fetchData();
    GetDataToBackend(); // Call the function to get data from the backend
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('your-api-endpoint');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setErrorMsg('Failed to get users.');
    }
  };

  const GetDataToBackend = async () => {
    const YOUR_TOKEN = localStorage.getItem('token');
    const response = await fetch('https://better-bikini-tick.cyclic.cloud/api/v2/messages/readAll', {
      method: 'GET',
      headers: {
        Authorization: `bearer ${YOUR_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    let actualData = await response.json();
    console.log(YOUR_TOKEN);
    // if(actualData.data?.length){
    for(let i = actualData.data?.length; i > 0; i--){
        reversedArray.push(actualData.data[i]);
    
     
    }
 
    setMessages(reversedArray);
    // setMessages(actualData.data)
    console.log(messages);
    const named=actualData
   
    // const rowsData = [
    //   { name:named.name , messages:named.message  },
    // ];
   console.log(named,"all message:",reversedArray, "length of the array:", named[0])
    // for (let i = 0; i < rowsData.length; i++) {
        

    //   const row = rowsData[i];
    //   console.log(`Name: ${named.name}`);
    //   console.log(`Message: ${named.messages}`);
    //   console.log(row);
    // }

    // setRows(rowsData);
  };


  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    setCurrentRole('');
  };

  const handleNewRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleConfirmCheckboxChange = (event) => {
    setConfirmCheckbox(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation
    if (selectedUser === '' || newRole === '' || !confirmCheckbox) {
      setErrorMsg('Please fill in all the fields and confirm the role change.');
      return;
    }

    // Handle form submission

    setSuccessMsg('Role change successful.');
    setSelectedUser('');
    setCurrentRole('');
    setNewRole('');
    setConfirmCheckbox(false);
  };

  return (
    <>
      <div className="admin-container">
        <div className="cont-side">
          <Sidebar />
        </div>
        
        <div className="admin-content">
        <div className="upper-part">
            <div className="part-one">
          <h4>WELCOME <span style={{color:"#009AC7"}}>
            Admin.</span></h4>
            </div>
            <div className="upbar">
              <div className="upicons"> 
            <i class='bx bx-search'></i>
            <i class='bx bx-bell'></i>
            </div>
            <div className="vertical"></div>
            <div className="credential">
            
              <h5>Tristan</h5>
              <p>tristanboo9@gmail.com</p>
            </div>
            </div>
            </div>
          <div className="line2"></div>  
      <h4 className='head'>All messages sent by users </h4>
        
          <table>
            <thead className='table-header'>
              <tr>
                <th className="header">Name</th>
                <th className="header">Messages</th>
              </tr>
            </thead>
            <tbody className="table-body">
            

                    {messages.length > 0 && messages.map((message, index) => {

                      return (
                        <>
                          {index  ? (
                            <tr key={index} className="table-row">
                            <td key={index}  className="item1" >{message?.name}</td>
                            <td key={index} className="item2"> {message?.message.length > 60 ? `${message?.message.substr(0, 60)}.....`:message?.message}</td>
                          </tr>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
            </tbody>
          </table>
        
        </div>
      </div>
    </>
  );
};

export default Messages;
