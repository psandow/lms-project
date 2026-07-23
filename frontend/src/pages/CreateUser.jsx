import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosinstance";
import UserForm from "../pages/UserForm";

export default function CreateUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      await axiosInstance.post("/auth/register/student/", formData);
      navigate("/");
    } catch (error) {
      setError(error.response?.data || "Error creating user");
    }
  }

  return (
    <section className="create-course">
      <h2>Create Account</h2>
      {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}

      <UserForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create User"
        showRole={false}
      />
    </section>
  );
}