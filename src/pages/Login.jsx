import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; 
import axios from "axios"

export const Login = (props) => {

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [authenticated, setauthenticated] = useState(null);

    const navigate = useNavigate(); 

    const login = () => {

        axios({
            method: "POST",
            withCredentials: true,
            url:"https://simutradeserver2.onrender.com/login", 
            data:{
                username:loginUsername,
                password:loginPassword,
            },
        }).then((res) => {
            console.log(res.data)
            setauthenticated(res.data); 
        }); 
    };

    const getUser = () => {
        axios({
            method: "GET", 
            withCredentials: true, 
            url: "https://simutradeserver2.onrender.com/user",
        }).then((res) => {
            // setData(res.data);
            console.log(res.data); 
        });
    };

    const handleRoute = () => {
        navigate("/simulator"); 
    }

    return (
        <div className="auth-form-container">
            <div>
                <h2>SimuTrade Login</h2>
                <div class = "LoginName">
                    Username:<input
                    placeholder="username" type = "username"
                    onChange={(e) => setLoginUsername(e.target.value)}
                    />
                    Password:<input
                    placeholder="password" type ="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button onClick={login}>Submit</button>
                </div>
            </div>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
            {authenticated ? <><h2>You are logged in, {authenticated.username}. Click this button to go to the simulator: </h2>
                <button onClick={handleRoute}>Go to Sim</button></>
                : <h2>Not logged in</h2>}

            {/* <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
                {authenticated ? <h1>Welcome Back {authenticated.username}</h1> : null}
            </div> */}
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