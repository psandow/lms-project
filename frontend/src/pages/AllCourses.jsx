import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosinstance";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/courses/")
      .then(response => setCourses(response.data))
      .catch(error => console.error("Error fetching courses:", error));
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axiosInstance.delete(`/courses/${id}/delete/`);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }

  return (
    <section className="mycourses">
      <h2>All Courses</h2>
      <p>{courses.length} courses</p>

      <div className="courses-grid">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={(id) => navigate(`/course/${id}/edit`)}
            onDelete={handleDelete}
            showTeacher={true}
          />
        ))}
      </div>
    </section>
  );
}