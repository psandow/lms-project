import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosinstance";
import { AuthContext } from "../context/AuthContext";

export default function CreateCourse({ initialData = null, onSubmit = null }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [teacher, setTeacher] = useState(initialData?.teacher || "");
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const endpoint =
    user?.role === "admin" ? "/courses/create-as-admin/" : "/courses/create/";

  useEffect(() => {
    async function fetchTeachers() {
      if (user?.role === "admin") {
        const response = await axiosInstance.get("users/teachers/");
        setTeachers(response.data);
      }
    }
    fetchTeachers();
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = 
      user?.role === "admin" ? { name, description, teacher } : { name, description };
// usable for editting courses
    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await axiosInstance.post(endpoint, payload);
      }
      if (user?.role === "admin") {
        navigate("/admin/courses");
      } else {
        navigate("/teacher/courses");
      }
    } catch (error) {
      console.error("Error saving course:", error.response?.data || error);
    }
  }

  return (
      <section className="create-course">
        <h2>{initialData ? "Edit Course" : "Create Course"}</h2>
        <p>{initialData ? "Update course details" : "Add a new course"}</p>

        <form onSubmit={handleSubmit} className="course-form">
          <label htmlFor="Course title">
            Course title
            <input
              id="course title"
              type="text"
              maxLength={75}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label htmlFor="Course description">
            Course description
            <textarea
              id="Course description"
              maxLength={100}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              required
            />
          </label>

          {user?.role === "admin" && (
            <label>
              Assign teacher
              <select value={teacher} onChange={(e) => setTeacher(e.target.value)} required>
                <option value="">
                  Select a teacher
                </option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.username}
                    </option>
                  ))}
              </select>
            </label>
          ) }

          <button type="submit" className="course-form-button">
            {initialData ? "Save Changes" : "Create Course"}
          </button>
        </form>
      </section>
  );
}
