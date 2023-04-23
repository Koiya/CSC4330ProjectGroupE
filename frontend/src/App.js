import './App.css';
import {
    Navbar,
    FindATutor,
    Home,
    Notifications,
    NotificationMessage,
    ProfileSettings,
    Login,
    Registration,
    PrivateRoute,
    PrivateRouteRole,
    PublicRoute,
    Appointment
} from './Pages'
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
           <Route path="/appointment" element={<PrivateRouteRole><Appointment/></PrivateRouteRole>} />
           <Route path="/ProfileSettings" element={<PrivateRoute><ProfileSettings/></PrivateRoute>} />
           <Route path="/Notifications" element={<PrivateRoute><Notifications/></PrivateRoute>} />
           <Route path="/NotificationMessage" element={<NotificationMessage/>} />
           <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
           <Route path="/register" element={<PublicRoute><Registration/></PublicRoute>} />
       </Routes>
      </div>
    </>
  );
}

export default App;
