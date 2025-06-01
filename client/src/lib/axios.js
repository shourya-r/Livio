import axios from "axios";

// TODO: update the baseURL so that it works in production
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // send cookies with requests
});
