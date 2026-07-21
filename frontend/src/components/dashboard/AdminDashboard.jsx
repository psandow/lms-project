import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../api/axiosinstance";
import DashboardLayout from "../layout/DashboardLayout";
import { AuthContext } from "../../context/AuthContext";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [overview, setOverview] = useState({ courses: 0, students: 0, users: 0 });
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        // Get all courses
        const coursesRes = await axiosInstance.get("/courses/");
        const coursesData = coursesRes.data;

        // Count total courses
        const totalCourses = coursesData.length;

        // Count total students (sum of enrolled per course)
        const totalStudents = coursesData.reduce(
          (sum, course) => sum + (course.students?.length || 0),
          0
        );

        // Get all users
        const usersRes = await axiosInstance.get("/users/");
        const totalUsers = usersRes.data.length;

        setOverview({
          courses: totalCourses,
          students: totalStudents,
          users: totalUsers,
        });

        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="dashboard">
      <h2>Welcome, {user?.username}</h2>
      <p>System overview:</p>

      <div className="dashboard-overview">
        <div className="overview-card clickable" onClick={() => navigate("/admin/courses")}>
          <h3>Total Courses</h3>
          <p>{overview.courses} published</p>
        </div>
        <div className="overview-card">
          <h3>Total Students</h3>
          <p>{overview.students} across all courses</p>
        </div>
        <div className="overview-card clickable" onClick={() => navigate("/admin/users")}>
          <h3>Total Users</h3>
          <p>{overview.users} of all types</p>
        </div>
      </div>

      <h3>Courses:</h3>
      <table className="courses-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Teacher</th>
            <th>Enrolled</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>{c.teacher_name}</td>
              <td>{c.students?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
