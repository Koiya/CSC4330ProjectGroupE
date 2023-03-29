import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

    }
    
    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label for="email">Email</label>
             <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@mail.com" id="email" name="email"/>
             <label for="password">Password</label>
             <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
             <button type="submit">Log In</button>
             </form>
             <button className="link-btn">Don't have an account? Register here.</button>
             <button className="link-btn">Forgot Password?</button>
        </div>
    )
}