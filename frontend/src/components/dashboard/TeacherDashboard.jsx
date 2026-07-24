import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosinstance";
import DashboardLayout from "../layout/DashboardLayout";
import { AuthContext } from "../../context/AuthContext";
import "./Dashboard.css";

export default function TeacherDashboard() {
  const { user } = useContext(AuthContext);
  const [overview, setOverview] = useState({ courses: 0, students: 0, completion: 0 });
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const coursesRes = await axiosInstance.get("/courses/taught/");
      const coursesData = coursesRes.data;

      // Unique students across all taught courses
      let allStudents = [];

      for (const course of coursesData) {
        allStudents.push(...course.students);
      }

      const totalStudents = new Set(allStudents).size;


      const completedCount = coursesData.filter(c => c.is_complete).length;
      const completionPercent = coursesData.length > 0
        ? Math.round((completedCount / coursesData.length) * 100)
        : 0;

      setOverview({
        courses: coursesData.length,
        students: totalStudents,
        completion: completionPercent,
      });
      setCourses(coursesData);
    }
    fetchData();
  }, []);

  return (
    <section className="dashboard">
      <h2>Welcome, {user?.username}</h2>
      <p>Your learning overview:</p>

      <div className="dashboard-overview">
        <div className="overview-card clickable" onClick={() => navigate("/teacher/courses")}>
          <h3>My Courses</h3>
          <p>{overview.courses} published</p>
        </div>
        <div className="overview-card">
          <h3>Total Students</h3>
          <p>{overview.students} across courses</p>
        </div>
        <div className="overview-card">
          <h3>Completion</h3>
          <p>{overview.completion}% completed courses</p>
        </div>
      </div>

      <h3>Your courses:</h3>
      <div className="courses-grid">
        {courses.map(c => (
          <div key={c.id} className="course-card" onClick={() => navigate(`/course/${c.id}/edit`)}>
            <h4>{c.name}</h4>
            <p>{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
