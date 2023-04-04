import './App.css';
import DataTable from './components/datatable.jsx';
import Navbar from './Navbar/Navbar';
import FindATutor from './Pages/FindATutor';
import Home from './Pages/Home';
import Notifications from './Pages/Notifications';
import NotificationMessage from './Pages/NotificationMessage';
import ProfileSettings from './Pages/ProfileSettings';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import {Route, Routes} from "react-router-dom";
function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

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
          <Route path="/Login" element={<Login/>} />
          <Route path="/Registration" element={<Registration/>} />
       </Routes>
      </div>
    </>
  );
}

export default App;
