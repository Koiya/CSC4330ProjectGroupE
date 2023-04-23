import React, { useState } from "react";
import {Link} from "react-router-dom";
import Axios from 'axios';

export default function Registration() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('');
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [message, setMessage] = useState('');
    const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/register";
    const handleSubmit = (e) => {
        e.preventDefault();
        if(firstName.trim() === '' || email.trim() === ''|| pass.trim() === ''){
            setMessage('All fields are required');
            return;
        }
        const requestBody = {
            first_name:firstName,
            last_name:lastName,
            email:email,
            password:pass,
            role:role,
        }
        Axios.post(URL,requestBody)
            .then( (response) => {
            setMessage('Registration Successful')
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
            setMessage(error.response.data);
        });
    }

    return (
        <div className="auth-form-container">
          <form className="registration-form" onSubmit={handleSubmit}>
              <label className="theLabel">Full Name</label>
                <input className="theInput" value={firstName} onChange={(e) => setFirst(e.target.value)} id="name" placeholder="First Name" />
                <input className="theInput" value={lastName} onChange={(e) => setLast(e.target.value)} id="name" placeholder="Last Name" />
                <label className="theLabel" for="email">Email</label>
                <input className="theInput" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@mail.com" id="email" name="email"/>
                <label className="theLabel" for="password">Password</label>
                <input className="theInput" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                <label className="theLabel">Select Role</label>
                  <input
                      style={{float:"left", position:"relative"}}
                      name="field"
                      type='radio'
                      value="tutor"
                      onChange={(e) => setRole(e.target.value)}
                  />
                    <div style={{color:"white"}}>Tutor</div>

                  <input
                  style={{float:"left", position:"relative"}}
                  name="field"
                  type='radio'
                  value="user"
                  onChange={(e) => setRole(e.target.value)}
                    />
                <div style={{color:"white"}}>Student</div>
                <button className="theButton" type="submit" >Register</button>
          </form>
            <button className="link-btn"><Link to="/login">Already have an account? Login here.</Link></button>
            {message && <p className="message"> {message}</p>}
        </div>
    )
}