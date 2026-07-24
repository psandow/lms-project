import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosinstance";
import CourseCard from "../components/CourseCard";

export default function BrowseCourses() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axiosInstance.get("/courses/available/");
        setCourses(response.data);
        const uniqueTeachers = [...new Set(response.data.map(c => c.teacher_name))];
        setTeachers(uniqueTeachers);
      } catch (error) {
        setError("Failed to load courses");
      }
    }
    fetchCourses();
  }, []);

  async function handleEnroll(courseId) {
    const confirm = window.confirm("Enroll in this course?");
    if (!confirm) return;

    try {
      await axiosInstance.put(`/courses/${courseId}/enroll/`);
      alert("Enrolled successfully!");
    } catch (err) {
      alert("Failed to enroll");
    }
  }

  const filteredCourses = selectedTeacher
    ? courses.filter(c => c.teacher_name === selectedTeacher)
    : courses;

  return (
    <section className="dashboard-section">
      <h2>Browse Courses</h2>
      <p>{courses.length} courses available</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="filters">
        <input type="text" placeholder="Search placeholder" />
        <button onClick={() => setSelectedTeacher("")}>All</button>
        <select
          value={selectedTeacher}
          onChange={e => setSelectedTeacher(e.target.value)}
        >
          <option value="">Filter by teacher</option>
          {teachers.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      
      <div className="courses-grid">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            mode="student-browse"
            onEnroll={handleEnroll}
            showTeacher={true}
          />
        ))}
      </div>
    </section>
  );
}