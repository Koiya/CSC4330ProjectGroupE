import './App.css';
import Navbar from './Navbar/Navbar';
import FindATutor from './Pages/FindATutor';
import Home from './Pages/Home';
import Notifications from './Pages/Notifications';
import NotificationMessage from './Pages/NotificationMessage';
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
          <Route path="/Notifications" element={<Notifications/>} />
          <Route path="/NotificationMessage" element={<NotificationMessage/>} />
       </Routes>
      </div>
    </>
  );
}

export default App;
