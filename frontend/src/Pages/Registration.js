import React, { useState } from "react";

export default function Registration() {
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
              <label>Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                <label for="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@mail.com" id="email" name="email"/>
                <label for="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                <label>Confirm Password</label>
                <input value={pass} id="confirmpass" placeholder="Confirm Password" />
                <button type="submit">Register</button>
          </form>
                  <button className="link-btn">Already have an account? Login here.</button>
        </div>
    )
}