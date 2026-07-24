import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosinstance";
import CourseCard from "../components/CourseCard";

export default function MyEnrollments() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEnrolled() {
      try {
        const response = await axiosInstance.get("/courses/enrolled/");
        setCourses(response.data);
      } catch (error) {
        setError("Failed to load enrolled courses");
      }
    }
    fetchEnrolled();
  }, []);

  async function handleUnenroll(courseId) {
    const confirm = window.confirm("Are you sure you want to unenroll from this course!?")
    if (!confirm) return;

    try {
      await axiosInstance.put(`/courses/${courseId}/unenroll/`);
      setCourses(prev => prev.filter(c => c.id !== courseId));
    } catch (error) {
      alert("Failed to unenroll");
    }
  }

  return (
    <section className="dashboard-section">
      <h2>Your Enrolled Courses</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="courses-grid">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            mode="student-enrolled"
            onUnenroll={() => handleUnenroll(course.id)}
          />
        ))}
      </div>
    </section>
  );
}