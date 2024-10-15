import axios from "axios";
import { config } from "./config";

const axiosInstance = axios.create({
  baseURL: config.BaseUrl,
  withCredentials: true,
});

export default axiosInstance;
