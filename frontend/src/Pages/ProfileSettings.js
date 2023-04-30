import React, { useState } from "react";
import johnsmith from './images/johnsmith.jpg';
import {getRole,getUser,getName} from "./components/auth";

export default function ProfileSettings() {

    let role = getRole();
    let user = getUser();
    let name = getName();


    return (
        <div >
            <div className="backgroundNotyPage">
                <h2 className="theLabel2">Name: <label className="theLabel2">{name}</label> </h2>
                <h2 className="theLabel2">Email: <label className="theLabel2">{user}</label> </h2>
                <h2 className="theLabel2">Role: <label className="theLabel2">{role}</label> </h2>
            </div>
       </div>
    )
}