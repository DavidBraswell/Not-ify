import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api" // predetermined url, to be concatenated with endpoints
})