import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // replace with your backend URL
  withCredentials: true,
});

export default api;
