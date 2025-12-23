// src/utils/api.js
import axios from "axios";

// Use Vite environment variable when available (set VITE_API_URL),
// otherwise fall back to localhost for local development.
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

// Simple POST function
export const apiPost = async (url, data) => {
    try {
        const response = await axios.post(`${API_BASE}${url}`, data);
        return response.data; // Axios gives data directly
    } catch (err) {
        // Axios puts server message in err.response.data
        const message = err.response?.data?.msg || err.message || "Network error";
        throw new Error(message);
    }
};
