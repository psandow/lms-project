import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosinstance";


export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axiosInstance.get("/courses/taught/");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    }
    fetchCourses();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axiosInstance.delete(`/courses/${id}/`);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  }

  return (
    <section className="mycourses">
      <h2>My Courses</h2>
      <p>{courses.length} courses</p>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <div className="course-actions">
              <button onClick={() => navigate(`/teacher/course/${course.id}/edit`)}>Edit</button>
              <button onClick={() => handleDelete(course.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
