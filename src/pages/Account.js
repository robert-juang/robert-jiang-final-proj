import React from 'react';
  
const Account = () => {

  // pass information from mongoose database here. We want to see if user is loggin in and 
  // retrieve the corresponding user data 
  


  return (
    <div class = "settings">
      <h3>Account Settings</h3>
      <div class = "information">
        <span>Account Information</span>
      </div>
      <div class = "content">
        <span id="C1">Email: </span>
        <span id="C1">Password:</span>
        <span id="C1">Date Created:</span>
        <span id="C1">Bio:</span>
      </div>
    </div>
  );
};
  
export default Account;