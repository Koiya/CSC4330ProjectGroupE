import {Link, useNavigate, useMatch, useResolvedPath} from "react-router-dom";
import {resetUserSession, getToken, getRole} from "./auth";

function UserLogin({handler}){
    const isLoggedIn = getToken();
    if (!isLoggedIn){
        return <><PageLink to="/register">Register</PageLink><PageLink to="/login">Login</PageLink></>
    }
    return <><PageLink to="/ProfileSettings">Profile Settings</PageLink>
            <PageLink to="/Login" onClick={handler}>Log Out</PageLink>
        </>
}

export default function Navbar(){
    let navigate = useNavigate();
    let role = getRole();
    const logoutHandler = async (e) => {
        e.preventDefault();
        try{
            resetUserSession();
            navigate("/login");
        } catch(e){
            console.log(e.message);
        }
    }
    return (
        <nav className="nav">
            <ul>
                <PageLink to="/">Home</PageLink>
                {role === "user" ? <><PageLink to="/FindATutor">Find A Tutor</PageLink></>: <></>}
                {role === "tutor" ? <><PageLink to="/appointment">Appointments</PageLink> <PageLink to="/Notifications">Notifications</PageLink></>: <></>}
                {role === "admin" ? <><PageLink to="/admin">Admin</PageLink></>: <></>}
            </ul>
            <ul>
                <UserLogin handler={logoutHandler}/>
            </ul>
        </nav>
    )
}

function PageLink({to, children, ...props}) {
    const resolvePath = useResolvedPath(to);
    const isActive = useMatch({path: resolvePath.pathname, end: true});
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}
