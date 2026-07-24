import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "./Sidebar";
import "../dashboard/Dashboard.css";

export default function DashboardLayout({ role, children }) {
  const { user } = useContext(AuthContext);

  const linksByRole = {
    student: [
      { label: "Dashboard", to: "/student", end: true },
      { label: "Browse Courses", to: "/student/browse-courses" },
      { label: "My Enrollments", to: "/student/enrollments" },
    ],
    teacher: [
      { label: "Dashboard", to: "/teacher", end: true },
      { label: "My Courses", to: "/teacher/courses" },
      { label: "Create Course", to: "/teacher/create-course" },
    ],
    admin: [
      { label: "Dashboard", to: "/admin", end: true },
      { label: "All Courses", to: "/admin/courses" },
      { label: "Manage Users", to: "/admin/users" },
    ],
  };

  const links = linksByRole[role] || linksByRole.student;
// Pass user and role‑based links into Sidebar as props
  return (
    <div className="dashboard-layout">
      <Sidebar user={user} links={links} />
      <main className="dashboard-content">{children}</main>
    </div>
  );
}
