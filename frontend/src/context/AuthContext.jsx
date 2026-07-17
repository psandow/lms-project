import { createContext, useState, useEffect } from "react";
import axios from "axios";

// context container to share auth data across app without need to pass props.
export const AuthContext = createContext();

// AuthProvider component to wrap the app at top level in main.jsx and provide auth context to all components 'children'.
export function AuthProvider({ children }) {
    // stores logged in user object
  const [user, setUser] = useState(null);
    // stores JWT access and refresh tokens for authentication
  const [access, setAccess] = useState(null);
  const [refresh, setRefresh] = useState(null);

   // checks if there are tokens in localStorage when the app loads and fetches user data if tokens are found. This ensures that the user remains logged in across page refreshes. 
  useEffect(() => {
    const storedAccess = localStorage.getItem("access");
    const storedRefresh = localStorage.getItem("refresh");
   // restores access token and refresh tokens from local storage and sends GET request (fetchUser function via axios.get) to fetch user data.
    if (storedAccess && storedRefresh) {
      setAccess(storedAccess);
      setRefresh(storedRefresh);
      fetchUser(storedAccess);
    }
  }, []);
   // asynchronous function to fetch user data from the backend using the access token. It sends a GET request to the /auth/me/ endpoint with the Authorization header set to the Bearer token. If successful, it updates the user state with the fetched data. If there's an error, it logs it to the console.
  async function fetchUser(token) {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/auth/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  }
   // asynchronous function to send a POST request to the backend for user login. It takes username and password as parameters, sends them to the /auth/login/ endpoint, and expects to receive access and refresh tokens in response. Upon successful login, it updates the access and refresh states, stores the tokens in localStorage, and calls fetchUser to retrieve the logged-in user's data.
  const login = async (username, password) => {
    const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
      username,
      password,
    });
   // repsonse.data parsed JSON from backend.
    setAccess(response.data.access);
    setRefresh(response.data.refresh);

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    const userData = await fetchUser(response.data.access);
    return userData;
  };

  // React's .Provider provides the user object and login function to the entire app.
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}
