import './App.css';
import Navbar from './Navbar/Navbar';
import FindATutor from './Pages/FindATutor';
import Home from './Pages/Home';
import LogOut from './Pages/LogOut';
import Notifications from './Pages/Notifications';
import ProfileSettings from './Pages/ProfileSettings';
import {Route, Routes} from "react-router-dom";

function App() {
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
       </Routes>
      </div>
    </>
  );
}

export default App;
