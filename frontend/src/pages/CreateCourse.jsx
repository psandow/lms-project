import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosinstance";

export default function CreateCourse({ initialData = null, onSubmit = null }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = { name: title, description };
// usable for editting courses. Needs coding and testing.
    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await axiosInstance.post("/courses/create/", payload);
      }
      navigate("/teacher/courses");
    } catch (error) {
      console.error("Error saving course:", error.response?.data || error);
    }
  }

  return (
      <section className="create-course">
        <h2>{initialData ? "Edit Course" : "Create Course"}</h2>
        <p>{initialData ? "Update course details" : "Add a new course"}</p>

        <form onSubmit={handleSubmit} className="course-form">
          <label>
            Course title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Course description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              required
            />
          </label>

          <button type="submit" className="course-form-button">
            {initialData ? "Save Changes" : "Create Course"}
          </button>
        </form>
      </section>
  );
}
