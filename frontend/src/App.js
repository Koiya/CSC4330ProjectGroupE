import './App.css';
import {
    Navbar,
    FindATutor,
    Home,
    Notifications,
    Admin,
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
           <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
           <Route path="/FindATutor" element={<PrivateRoute><FindATutor/></PrivateRoute>} />
           <Route path="/appointment" element={<PrivateRouteRole><Appointment/></PrivateRouteRole>} />
           <Route path="/ProfileSettings" element={<PrivateRoute><ProfileSettings/></PrivateRoute>} />
           <Route path="/Notifications" element={<PrivateRouteRole><Notifications/></PrivateRouteRole>} />
           <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
           <Route path="/register" element={<PublicRoute><Registration/></PublicRoute>} />
           <Route path="/admin" element={<PrivateRouteRole><Admin/></PrivateRouteRole>} />
       </Routes>
      </div>
    </>
  );
}

export default App;
