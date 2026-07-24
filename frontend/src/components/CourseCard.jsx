export default function CourseCard({ course, onEdit, onDelete, showTeacher, onUnenroll, onEnroll, mode = "default" }) {
  return (
    <div className="course-card">
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <br></br>
      {showTeacher && (
        <p>Teacher: {course.teacher_name}</p>
      )}

      <div className="course-actions">
        {mode === "teacher" && (
          <div>
            <button onClick={() => onEdit(course.id)}>Edit</button>
            <button onClick={() => onDelete(course.id)}>Delete</button>
          </div>
        )}
        {mode === "admin" && (
          <div>
            <button onClick={() => onEdit(course.id)}>Edit</button>
            <button onClick={() => onDelete(course.id)}>Delete</button>
          </div>
        )}
        {mode === "student-enrolled" && (
          <button className="unenroll-button" onClick={() => onUnenroll(course.id)}>Unenroll</button>
        )}
        {mode === "student-browse" && (
          <button className="enroll-button" onClick={() => onEnroll(course.id)}>Enroll</button>
        )}           
      </div>
    </div>
  );
}