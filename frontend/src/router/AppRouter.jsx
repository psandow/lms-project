import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import StudentDashboard from "../pages/StudentDashboard";

// Defining the routes for the application using React Router's createBrowserRouter function. Each route is associated with a specific component that will be rendered when the route is accessed.

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/student",
    element: <StudentDashboard />,
  },
]);

export default router;
