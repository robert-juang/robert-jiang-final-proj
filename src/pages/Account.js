import React, { useState, useRef, useEffect } from 'react';
import axios from "axios"
const Account = () => {

  // pass information from mongoose database here. We want to see if user is loggin in and 
  // retrieve the corresponding user data 
  const [data, setData] = useState({}); 

  useEffect(()=>{
    async function getData(){
      await axios({
          method: "GET", 
          withCredentials: true, 
          url: "https://simutradeserver2.onrender.com/user",
      }).then((res) => {
          setData(res.data);
          console.log(res); 
      });
    }
    getData(); 
  },[])
      

  return (
    <div class = "settings">
      <h3>Account Settings</h3>
      <div class = "information">
        <span>Account Information</span>
      </div>
      <div class = "content">
        <span id="C1">Username: {data.username}</span>
        <span id="C1">Date Created:{data.dateCreated}</span>
        <span id="C1">Number of Simulations Completed:{data.simulationsCompleted}</span>
      </div>
    </div>
  );
};
  
export default Account;