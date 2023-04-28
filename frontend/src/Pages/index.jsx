import Navbar from './components/Navbar.js';
import FindATutor from './FindATutor.js';
import Home from './Home.js';
import Notifications from './Notifications.js';
import NotificationMessage from './NotificationMessage.js';
import ProfileSettings from './ProfileSettings.js';
import Login from './Login.js';
import Registration from './Registration.js';
import {PrivateRoute, TutorRoute,AdminRoute} from './components/PrivateRoute.js'
import PublicRoute from './components/PublicRoute.js'
import Appointment from './appointment.js'
import {getToken} from './components/auth'
import Admin from './admin.js'
export {Navbar,Admin,FindATutor,Home,Notifications,NotificationMessage,ProfileSettings,Login,Registration, PrivateRoute,TutorRoute, AdminRoute, PublicRoute, Appointment,getToken}