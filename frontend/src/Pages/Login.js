import React, { useState } from "react";
import Axios from "axios";

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const login = () => {
        Axios.post("URL", {
            username:email,
            password:pass,
        }).then( (response) => {
            console.log(response);
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

    }
    
    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="theLabel" for="email">Email</label>
                <input className="theInput" value={email}
                       onChange={
                        (e) => setEmail(e.target.value)
                        }
                       type="email" placeholder="youremail@mail.com" id="email" name="email"/>

                <label className="theLabel" for="password">Password</label>
                <input className="theInput" value={pass}
                       onChange={
                        (e) => setPass(e.target.value)
                        }
                       type="password" placeholder="********" id="password" name="password"/>
                <button className="theButton" type="submit">Log In</button>
             </form>
             <button className="link-btn">Don't have an account? Register here.</button>
             <button className="link-btn">Forgot Password?</button>
        </div>
    )
}