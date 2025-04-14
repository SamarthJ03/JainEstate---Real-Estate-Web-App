import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:8802/api",
    withCredentials: true,
});

export default apiRequest;
