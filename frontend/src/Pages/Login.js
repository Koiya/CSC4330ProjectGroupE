import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

    }

    const navigate = useNavigate();

    const navigateToRegistration = () => {
        navigate('/Registration');
    };

    const navigateToHome = () => {
        navigate('/Home');
    };
    
    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="theLabel" for="email">Email</label>
             <input className="theInput" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@mail.com" id="email" name="email"/>
             <label className="theLabel" for="password">Password</label>
             <input className="theInput" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
             <button className="theButton" type="submit" onClick={navigateToHome}>Log In</button>
             </form>
             <button className="link-btn" onClick={navigateToRegistration}>Don't have an account? Register here.</button>
             <button className="link-btn">Forgot Password?</button>
        </div>
    )
}