import React, { useState } from "react";
import "./login.css"; 
import Axios from "axios"

export const Login = (props) => {

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);

    const login = () => {
        Axios({
            method: "POST",
            data:{
                username:loginUsername,
                password:loginPassword,
            },
            withCredentials: false,
            url:"http://localhost:8000/login", 
        }).then((res) => console.log(res)); 
    };

    const getUser = () => {
        Axios({
            method: "GET", 
            withCredentials: false, 
            url: "http://localhost:8000/user",
        }).then((res) => {
            // setData(res.data);
            console.log(res.data); 
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault(); 
    //     console.log(email);
    //     console.log(password) 
    // }

    return (
        <div className="auth-form-container">
            <div>
                <h2>Login</h2>
                Username:<input
                placeholder="email"
                onChange={(e) => setLoginUsername(e.target.value)}
                />
                Password:<input
                placeholder="password"
                onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={login}>Submit</button>
            </div>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
            <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
                {data ? <h1>Welcome Back {data.username}</h1> : null}
            </div>
        </div>
        
        // <div className="auth-form-container">
        //     <h2>SimuTrade Login</h2>
        //     <form className="login-form" onSubmit={handleSubmit}>
        //         <label htmlFor="email">Email</label>
        //         <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        //         <label htmlFor="password">Password</label>
        //         <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        //         <button type="submit" onClick={evt => handleSubmit(evt)}>Log In</button>
        //     </form>
        //     <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        // </div>
    )
}