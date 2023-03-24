export default function Navbar(){
  return (
    <nav className="nav">
      <ul>
        <li>
          <a href="/Home">Home</a>
          </li>
        <li>
          <a href="/FindATutor">Find A Tutor</a>
          </li>
        <li>
          <a href="/ProfileSettings">Profile Settings</a>
          </li>
        <li>
          <a href="/LogOut">Log Out</a>
          </li>
        <li>
          <a href="/Notifications">Notifications</a>
          </li>
      </ul>
    </nav>
  )
}