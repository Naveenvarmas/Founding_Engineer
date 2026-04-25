import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "/api";

const api = axios.create({
  baseURL,
});

export default api;