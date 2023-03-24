export default function Navbar(){
  return (
    <nav className="nav">
      <ul>
        <PageLink href="/Home">Home</PageLink>
        <PageLink href="/FindATutor">Find A Tutor</PageLink>
        <PageLink href="/ProfileSettings">Profile Settings</PageLink>
        <PageLink href="/LogOut">Log Out</PageLink>
        <PageLink href="/Notifications">Notifications</PageLink>
      </ul>
    </nav>
  )
}

function PageLink({href, children, ...props}) {
  const path = window.location.pathname;

  return (
    <li className={path === href ? "active" : ""}>
      <a href={href} {...props}>{children}</a>
    </li>
  )
}