import './App.css';
import Navbar from './Navbar/Navbar';
import FindATutor from './Pages/FindATutor';
import Home from './Pages/Home';
import LogOut from './Pages/LogOut';
import Notifications from './Pages/Notifications';
import ProfileSettings from './Pages/ProfileSettings';

function App() {
  let page
  switch (window.location.pathname) {
    case "/":
        page = <Home/>
      break
    case "/FindATutor":
        page = <FindATutor/>
      break
    case "/ProfileSettings":
        page = <ProfileSettings/>
      break
    case "/LogOut":
        page = <LogOut/>
      break
    case "/Notifications":
        page = <Notifications/>
      break
  }
  return (
    <>
      <Navbar/>
      {page}
    </>
  );
}

export default App;
