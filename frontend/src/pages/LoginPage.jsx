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
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Welcome to LMS Login</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

