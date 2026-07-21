import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../dashboard/Dashboard.css";
import StudentSidebar from "./StudentSidebar";
import TeacherSidebar from "./TeacherSidebar";
import AdminSidebar from "./AdminSidebar";

export default function DashboardLayout({ role, children }) {
  const { user } = useContext(AuthContext);

  const renderSidebar = () => {
    switch (role) {
      case "teacher":
        return <TeacherSidebar user={user} />;
      case "admin":
        return <AdminSidebar user={user} />;
      default:
        return <StudentSidebar user={user} />;
    }
  };

  return (
    <div className="dashboard-layout">
      {renderSidebar()}
      <main className="dashboard-content">{children}</main>
    </div>
  );
}
