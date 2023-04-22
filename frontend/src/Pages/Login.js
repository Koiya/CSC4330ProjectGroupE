import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import {setUserSession} from './components/auth';

const Login = (props) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/login";
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {
            email:email,
            password:pass,
        }
        Axios.post(URL,requestBody)
            .then( (response) => {
                setUserSession(response.data.user, response.data.token);
                setLoginStatus("Logged in");
                navigate('/');
            }).catch((err) =>{
                console.log(err);

                if(err.response.status === 404){
                    setLoginStatus(err.response.data);
                }
            })
    }
    
    return (
        <div className="auth-form-container">
            <h1>{loginStatus}</h1>
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
export default Login;