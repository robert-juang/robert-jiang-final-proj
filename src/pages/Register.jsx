import React, { useState } from "react"; 
import Axios from "axios";

export const Register = (props) => {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [data, setData] = useState(null);

    const register = () => {
        console.log("Clicked!"); 
        Axios({
            method: "POST", 
            data: {
                username: registerUsername, 
                password: registerPassword,
            }, 
            withCredentials: false, 
            url: "http://localhost:8000/register",
        }).then((res) => {console.log(res);setData(res.data)}); 
    }; 

    return (
        <div className = "auth-form-container">
            <div>
            <h2>Register for An Account</h2>
            <div class = "RegisterName">
                Username: <input
                placeholder="username" type = "username"
                onChange={(e) => setRegisterUsername(e.target.value)}
                />
                Password: <input
                placeholder="password" type ="password"
                onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button onClick={register}>Submit</button>
                </div>
            </div>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Login</button> 
            {data ? <h2>Your account is created. You can now go back to login</h2> : <h2>User not registered</h2>}

            {/* <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Sign up and Log in</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Login</button> */}

        </div>
    )
}


