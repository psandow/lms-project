import { NavLink } from "react-router-dom";

export default function StudentSidebar({ user }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-text">LMS</span>
      </div>


      <nav className="nav">
        <NavLink to="/student">Dashboard</NavLink>
        <NavLink to="/courses">Browse Courses</NavLink>
        <NavLink to="/enrollments">My Enrollments</NavLink>
      </nav>

      <div className="user-info">
        <p>{user?.username || "Loading..."}</p>
        <p>{user?.email || ""}</p>
        <button>Sign out</button>
      </div>
    </aside>
  );
}
