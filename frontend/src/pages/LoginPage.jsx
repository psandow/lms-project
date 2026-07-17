import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    //console.log("handleSubmit called with username:", username, "and password:", password);

    const userData = await login(username, password);
    //console.log("userData:", userData);

    if (userData?.role === "student") {
      navigate("/student");
    } else if (userData?.role === "teacher") {
      navigate("/teacher");
    } else if (userData?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
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

