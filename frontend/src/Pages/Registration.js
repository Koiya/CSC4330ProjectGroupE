import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

    }

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/Login');
    };

    return (
        <div className="auth-form-container">
          <form className="registration-form" onSubmit={handleSubmit}>
              <label className="theLabel">Full Name</label>
                <input className="theInput" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                <label className="theLabel" for="email">Email</label>
                <input className="theInput" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@mail.com" id="email" name="email"/>
                <label className="theLabel" for="password">Password</label>
                <input className="theInput" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                <label className="theLabel">Confirm Password</label>
                <input className="theInput" value={pass} id="confirmpass" placeholder="Confirm Password" />
                <button className="theButton" type="submit">Register</button>
          </form>
                  <button className="link-btn" onClick={navigateToLogin}>Already have an account? Login here.</button>
        </div>
    )
}