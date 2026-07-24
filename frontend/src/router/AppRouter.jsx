import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import TeacherDashboard from "../components/dashboard/TeacherDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import ManageUsers from "../pages/ManageUsers";
import MyCourses from "../pages/MyCourses";
import CreateCourse from "../pages/CreateCourse";
import EditCourse from "../pages/EditCourse";
import CreateUser from "../pages/CreateUser";
import EditUser from "../pages/EditUser";
import AllCourses from "../pages/AllCourses";
import MyEnrollments from "../pages/MyEnrollments";
import BrowseCourses from "../pages/BrowseCourses";

// Defining the routes for the application using React Router's createBrowserRouter function. Each route is associated with a specific component that will be rendered when the route is accessed.

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "create-user",
    element: <CreateUser />,
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
    path: "/student/enrollments",
    element: (
      <DashboardLayout role="student">
        <MyEnrollments />
      </DashboardLayout>
    ),
  },
  {
    path: "/student/browse-courses",
    element: (
      <DashboardLayout role="student">
        <BrowseCourses />
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
    path: "/teacher/courses",
    element: (
      <DashboardLayout role="teacher">
        <MyCourses />
      </DashboardLayout>
    ),
  },
  {
    path: "/teacher/create-course",
    element: (
      <DashboardLayout role="teacher">
        <CreateCourse />
      </DashboardLayout>
    ),
  },
  {
    path: "/course/:id/edit",
    element: (
      <DashboardLayout role="teacher">
        <EditCourse />
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
  {
  path: "/admin/edit-user/:id",
  element: (
     <DashboardLayout>
       <EditUser />
     </DashboardLayout>
  ),
  },
  {
  path: "admin/courses",
  element: (
      <DashboardLayout role="admin">
        <AllCourses />
      </DashboardLayout>
    ),
  },

]);

export default router;
