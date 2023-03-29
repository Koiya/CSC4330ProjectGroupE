import './App.css';
import React, { useState } from "react";
import Navbar from './Navbar/Navbar';
import FindATutor from './Pages/FindATutor';
import Home from './Pages/Home';
import LogOut from './Pages/LogOut';
import Notifications from './Pages/Notifications';
import ProfileSettings from './Pages/ProfileSettings';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import {Route, Routes} from "react-router-dom";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  
  return (
    <>
      <Navbar/>
      <div className="container">

       <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/FindATutor" element={<FindATutor/>} />
          <Route path="/ProfileSettings" element={<ProfileSettings/>} />
          <Route path="/LogOut" element={<LogOut/>} />
          <Route path="/Notifications" element={<Notifications/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Registration" element={<Registration/>} />
       </Routes>
      </div>
    </>
  );
}

export default App;
