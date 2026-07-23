import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosinstance";
import UserForm from "../pages/UserForm";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/users/${id}/`)
      .then(res => setFormData(res.data))
      .catch(err => setError("Failed to load user"));
  }, [id]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      await axiosInstance.patch(`/users/${id}/update/`, formData);
      navigate("/admin/users");
    } catch (error) {
      setError(error.response?.data || "Error updating user");
    }
  }

  return (
    <section className="create-course">
      <h2>Edit User</h2>
      {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}

      <UserForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        showRole={true}
      />
    </section>
  );
}