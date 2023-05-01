import React, { useState } from "react";
import {getRole,getUser,getName} from "./components/auth";
import johnsmith from './images/johnsmith.jpg';

export default function ProfileSettings() {

    let role = getRole();
    let user = getUser();
    let name = getName();


    return (
        <div>
            <div className="backgroundNotyPage">
            <img className="profilepic"/>
                <h2 className="theLabel2">Name: <label className="theLabel2">{name}</label> </h2>
                <hr></hr>
                <h2 className="theLabel2">Email: <label className="theLabel2">{user}</label> </h2>
                <hr></hr>
                <h2 className="theLabel2">Role: <label className="theLabel2">{role}</label> </h2>
                <hr></hr>
            </div>
       </div>
    )
}