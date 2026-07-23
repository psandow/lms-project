import axiosInstance from "../api/axiosinstance";

export function signout(navigate) {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  delete axiosInstance.defaults.headers.common["Authorization"];

  navigate("/");
}