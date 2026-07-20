import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../api/axiosinstance";
import DashboardLayout from "../layout/DashboardLayout";
import "./Dashboard.css";

export default function StudentDashboard() {
  const [overview, setOverview] = useState({ enrolled: 0, available: 0, completion: 0 });
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const enrolledRes = await axiosInstance.get("/courses/enrolled/");
      const availableRes = await axiosInstance.get("/courses/available/");
      
      const enrolledCourses = enrolledRes.data;

      const completedCount = enrolledCourses.filter(c => c.is_completed).length;
      
      //need to test this is working my marking a course as completed and checking if the completion percentage updates correctly.
      const completionPercent = enrolledCourses.length > 0 ? Math.round((completedCount / enrolledCourses.length) * 100) : 0;

      setOverview({
        enrolled: enrolledRes.data.length,
        available: availableRes.data.length,
        completion: completionPercent,
      });
      setCourses(enrolledRes.data);
    }
    fetchData();
  }, []);

  return (

    <section className="dashboard">
      <h2>Welcome, username</h2>
      <p>Your learning overview:</p>

      <div className="overview-grid">
        <div className="box" onClick={() => navigate("/enrollments")}>
          <h3>Enrolled</h3>
          <p>{overview.enrolled} active courses</p>
        </div>
        <div className="box" onClick={() => navigate("/courses")}>
          <h3>Available</h3>
          <p>{overview.available} total courses</p>
        </div>
        <div className="box" onClick={() => navigate("/enrollments")}>
          <h3>Completion</h3>
          <p>{overview.completion}% progress</p>
        </div>
      </div>

      <h3>Continue learning:</h3>
      <div className="courses-grid">
        {courses.map((c) => (
          <div key={c.id} className="course-card" onClick={() => navigate(`/course/${c.id}`)}>
            <h4>{c.title}</h4>
            <p>{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
