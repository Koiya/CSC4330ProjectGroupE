import React, { useState } from "react";
import johnsmith from './images/johnsmith.jpg';
import {getRole,getUser,getName} from "./components/auth";

export default function ProfileSettings() {

    let role = getRole();
    let user = getUser();
    let name = getName();


    return (
        <div className="auth-form-container">
            <div className="backgroundNotyPage">
                <h2 className="theLabel">Name: <label className="theLabel">{name}</label> </h2>
                <h2 className="theLabel">Email: <label className="theLabel">{user}</label> </h2>
                <h2 className="theLabel">Role: <label className="theLabel">{role}</label> </h2>
            </div>
       </div>
    )
}