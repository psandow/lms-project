import './App.css'
import { RouterProvider } from "react-router-dom";
import router from "./router/AppRouter";

// Bridge between the router and main.jsx, allowing the application to use the defined routes and render the appropriate components based on the current URL.

function App() {
  return <RouterProvider router={router} />;
}

export default App;