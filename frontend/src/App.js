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
    TutorRoute,
    PublicRoute,
    Appointment, AdminRoute
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
           <Route path="/appointment" element={<TutorRoute><Appointment/></TutorRoute>} />
           <Route path="/ProfileSettings" element={<PrivateRoute><ProfileSettings/></PrivateRoute>} />
           <Route path="/Notifications" element={<TutorRoute><Notifications/></TutorRoute>} />
           <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
           <Route path="/register" element={<PublicRoute><Registration/></PublicRoute>} />
           <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>} />
       </Routes>
      </div>
    </>
  );
}

export default App;
