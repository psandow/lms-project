import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosinstance";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [error, setError] = useState(null);
  const [showEnrolled, setShowEnrolled] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axiosInstance.get("/courses/")
      .then(response => {
        setCourses(response.data);

        const uniqueTeachers = [...new Set(response.data.map(c => c.teacher_name))];
        setTeachers(uniqueTeachers);
      })
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

  const visibleCourses = searchFiltered;

  return (
    <section className="dashboard-section">
          <h2>All Courses</h2>
          <p>{courses.length} total courses</p>
    
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
          </div>
          
          <div className="courses-grid">
            {visibleCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                mode="admin"
                showTeacher={true}
                onDelete={handleDelete}
                onEdit={() => navigate(`/course/${course.id}/edit`)}
              />
            ))}
          </div>
        </section>
  );
}