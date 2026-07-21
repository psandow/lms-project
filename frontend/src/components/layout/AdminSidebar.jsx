import { NavLink } from "react-router-dom";

export default function AdminSidebar({ user }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-box" /> <span>LMS</span>
      </div>
      <nav className="nav">
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/courses">All Courses</NavLink>
        <NavLink to="/admin/users">Manage Users</NavLink>
      </nav>

      <div className="user-info">
        <p>{user?.username || "Loading..."}</p>
        <p>{user?.email || ""}</p>
        <button>Sign out</button>
      </div>
    </aside>
  );
}
