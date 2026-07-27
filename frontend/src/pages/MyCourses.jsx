import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosinstance";
import CourseCard from "../components/CourseCard";


export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axiosInstance.get("/courses/taught/");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
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
      <h2>My Courses</h2>
      <p>{courses.length} courses</p>

      <div className="courses-grid">
        {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={(id) => navigate(`/course/${id}/edit`)}
              onDelete={handleDelete}
              showTeacher={false}
              mode="teacher"
        />
        ))}
      </div>
    </section>
  );
}
