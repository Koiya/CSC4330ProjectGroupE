import './App.css';
import {
    Navbar,
    FindATutor,
    Home,
    Notifications,
    NotificationMessage,
    ProfileSettings,
    Login,
    Registration
} from './Pages'
import {Route, Routes} from "react-router-dom";
function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

    fetch(URL)
        .then( response => console.log(response) )

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
