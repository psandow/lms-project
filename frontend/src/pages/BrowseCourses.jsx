import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosinstance";
import CourseCard from "../components/CourseCard";

export default function BrowseCourses() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [error, setError] = useState(null);
  const [showEnrolled, setShowEnrolled] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axiosInstance.get("/courses/available/");
        const enrolledResponse = await axiosInstance.get("/courses/enrolled/")

        const enrolledIds = new Set(enrolledResponse.data.map(c => c.id));

        const withFlags = response.data.map(course => ({...course, isEnrolled: enrolledIds.has(course.id)}));

        setCourses(withFlags);
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

      setCourses(prev =>
        prev.map(c => c.id === courseId ? { ...c, isEnrolled: true } : c)
      );

      alert("Enrolled successfully!");
    } catch (err) {
      alert("Failed to enroll");
    }
  }

  const filteredCourses = selectedTeacher
    ? courses.filter(c => c.teacher_name === selectedTeacher)
    : courses;

  const searchFiltered = filteredCourses.filter(c => {
    const term = searchTerm.toLowerCase();
    
    const name = c.name?.toLowerCase();
    const description = c.description?.toLowerCase();
    const teacher = c.teacher_name?.toLowerCase();

    return (
      name.includes(term) ||
      description.includes(term) ||
      teacher.includes(term)
    );
  });

  const visibleCourses = searchFiltered.filter(course => showEnrolled ? true : !course.isEnrolled);

  return (
    <section className="dashboard-section">
      <h2>Browse Courses</h2>
      <p>{courses.length} courses available</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="filters">
        <input type="text" placeholder="Search courses" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <button onClick={() => {setSelectedTeacher(""); setShowEnrolled(true); setSearchTerm("");}}>All</button>
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
        <label style={{ display: "block", marginBottom: "1rem" }}>
          <input type="checkbox" checked={showEnrolled} onChange={(e) => setShowEnrolled(e.target.checked)}/>
          Show enrolled courses
        </label>
      </div>
      
      <div className="courses-grid">
        {visibleCourses.map(course => (
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