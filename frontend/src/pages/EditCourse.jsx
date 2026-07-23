import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosinstance";
import CreateCourse from "./CreateCourse";

export default function EditCourse() {
  const { id } = useParams(); // /teacher/courses/:id/edit
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axiosInstance.get(`/courses/${id}/`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error loading course:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  async function handleEditSubmit(updatedData) {
    try {
      await axiosInstance.put(`/courses/${id}/update/`, updatedData);
    } catch (error) {
      console.error("Error updating course:", error.response?.data || error);
    }
  }

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <CreateCourse
      initialData={course}
      onSubmit={handleEditSubmit}
    />
  );
}
