import { NavLink } from "react-router-dom";

export default function TeacherSidebar({ user }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-box" /> <span>LMS</span>
      </div>

      <nav className="nav">
        <NavLink to="/teacher">Dashboard</NavLink>
        <NavLink to="/teacher/my-courses">My Courses</NavLink>
        <NavLink to="/teacher/create-course">Create Course</NavLink>
      </nav>

      <div className="user-info">
        <p>{user?.username || "Loading..."}</p>
        <p>{user?.email || ""}</p>
        <button>Sign out</button>
      </div>
    </aside>
  );
}
