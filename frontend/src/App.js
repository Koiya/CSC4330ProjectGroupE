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
    PublicRoute
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
           <Route path="/ProfileSettings" element={<PrivateRoute><ProfileSettings/></PrivateRoute>} />
           <Route path="/Notifications" element={<PrivateRoute><Notifications/></PrivateRoute>} />
           <Route path="/NotificationMessage" element={<NotificationMessage/>} />
           <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
           <Route path="/register" element={<Registration/>} />
       </Routes>
      </div>
    </>
  );
}

export default App;
