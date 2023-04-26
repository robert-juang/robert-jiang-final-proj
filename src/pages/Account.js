import React from 'react';
  
const Account = () => {

  // pass information from mongoose database here. We want to see if user is loggin in and 
  // retrieve the corresponding user data 


  // this will fetch the data we want 
//   const data = () => {
//     Axios({
//         method: "GET", 
//         withCredentials: false, 
//         url: "http://localhost:8000/user",
//     }).then((res) => {
//         console.log(res); 
//         console.log(res); 
//     });
// };

  //TODO: make the bio of the user clickable to edit 

  return (
    <div class = "settings">
      <h3>Account Settings</h3>
      <div class = "information">
        <span>Account Information</span>
      </div>
      <div class = "content">
        <span id="C1">Username: </span>
        <span id="C1">Password:</span>
        <span id="C1">Date Created:</span>
        <span id="C1">Bio:</span>
      </div>
    </div>
  );
};
  
export default Account;