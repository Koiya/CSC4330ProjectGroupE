import {Link, useMatch, useResolvedPath} from "react-router-dom";

export default function Navbar(){
  return (
    <nav className="nav">
      <ul>
        <PageLink to="/">Home</PageLink>
        <PageLink to="/FindATutor">Find A Tutor</PageLink>
        <PageLink to="/Notifications">Notifications</PageLink>
      </ul>
      <ul>
        <PageLink to="/ProfileSettings">Profile Settings</PageLink>
        <PageLink to="/LogOut">Log Out</PageLink>
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