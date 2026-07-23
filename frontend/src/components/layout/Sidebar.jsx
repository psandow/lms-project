import { NavLink } from "react-router-dom";
import { signout } from "../../utils/signout";
import { useNavigate } from "react-router-dom";


export default function Sidebar({ user, links }) {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-text">LMS</span>
      </div>

      <nav className="nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="user-info">
        <p>{user?.username || "Loading..."}</p>
        <p>{user?.email || ""}</p>
        <button onClick={() => signout(navigate)}>Sign out</button>
      </div>
    </aside>
  );
}
