import React, { useState } from "react";
import johnsmith from './images/johnsmith.jpg';

export default function ProfileSettings() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

    }

    return (
        <div className="auth-form-container2">
            <div className="backgroundNotyPage">
                <form className="registration-form" onSubmit={handleSubmit}>
                        <img src={johnsmith} className="profilepic" alt="img"/>
                        <label className="theLabel">Edit Name</label>
                        <input className="theInput" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="John Smith" />
                        <label className="theLabel" for="Change email">Email</label>
                        <input className="theInput" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="johnsmith@gmail.com" id="email" name="email"/>
                        <label className="theLabel" for="password">Password</label>
                        <input className="theInput" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                        <label className="theLabel">Change Password (Must input current password to change)</label>
                        <input className="theInput" value={pass} id="newpass" placeholder="New Password" />
                        <button type="submit" className="theButton">Save Changes</button>
                </form>
            </div>
       </div>
    )
}