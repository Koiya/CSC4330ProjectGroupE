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
        <div className="auth-form-container">
          <form className="registration-form" onSubmit={handleSubmit}>
                <img src={johnsmith} className="profilepic" />
                <label>Edit Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="John Smith" />
                <label for="Change email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="johnsmith@gmail.com" id="email" name="email"/>
                <label for="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                <label>Change Password (Must input current password to change)</label>
                <input value={pass} id="newpass" placeholder="New Password" />
                <button type="submit">Save Changes</button>
          </form>
       </div>
    )
}