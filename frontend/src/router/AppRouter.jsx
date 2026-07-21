import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import TeacherDashboard from "../components/dashboard/TeacherDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import ManageUsers from "../pages/ManageUsers";

// Defining the routes for the application using React Router's createBrowserRouter function. Each route is associated with a specific component that will be rendered when the route is accessed.

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/student",
    element: (
      <DashboardLayout role="student">
        <StudentDashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/teacher",
    element: (
      <DashboardLayout role="teacher">
        <TeacherDashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/admin",
    element: (
      <DashboardLayout role="admin">
        <AdminDashboard />
      </DashboardLayout>
    ),
  },
    {
    path: "/admin/users",
    element: (
      <DashboardLayout role="admin">
        <ManageUsers />
      </DashboardLayout>
    ),
  },

]);

export default router;
