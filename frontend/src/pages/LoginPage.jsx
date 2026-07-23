import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    //console.log("handleSubmit called with username:", username, "and password:", password);

   
    try {
        const userData = await login(username, password);

        if (userData?.role === "student") {
      navigate("/student");
    } else if (userData?.role === "teacher") {
      navigate("/teacher");
    } else if (userData?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }

    } catch (error) {
        setError(error.message);
    }
    
  }

  return (
    <section className="create-course">
      <div className="logo">
        <span className="logo-text">LMS</span>
      </div>
      <h2 className="text">Welcome to LMS Login & Account creation</h2>
      <p className="text">Enter your username and password to Login. If you don't have an account click Create Account.</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form className="course-form" onSubmit={handleSubmit}>
        <input
          label="Username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          label="Password"       
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="course-form-button" type="submit">Login</button>
        <button className ="course-form-button" type="button" onClick={() => navigate("/create-user")}>Create Account</button>
      </form>
    </section>
  );
}

export default LoginPage;

