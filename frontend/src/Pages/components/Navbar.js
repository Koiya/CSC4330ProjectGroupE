import {Link, useNavigate, useMatch, useResolvedPath} from "react-router-dom";
import {resetUserSession, getToken} from "./auth";

function UserLogin({handler}){
    const isLoggedIn = getToken();
    if (!isLoggedIn){
        return <><PageLink to="/register">Register</PageLink><PageLink to="/login">Login</PageLink></>
    }
    return <><PageLink to="/ProfileSettings">Profile Settings</PageLink>
            <button className="button" onClick={handler}>Log Out</button>
        </>
}

export default function Navbar(){
    let navigate = useNavigate();
    const logoutHandler = () => {
        resetUserSession();
        navigate('/');
    }
    return (
        <nav className="nav">
            <ul>
                <PageLink to="/">Home</PageLink>
                <PageLink to="/FindATutor">Find A Tutor</PageLink>
                <PageLink to="/Notifications">Notifications</PageLink>
                {/* <PageLink to="/Registration">Registration</PageLink> */}
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
