// src/pages/AdminLogin.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { apiPost } from "../utils/api";

function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await apiPost("/auth/login", {
                email,
                password,
                role: "admin", // important: tell backend it's admin
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            navigate("/admin-dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-10 rounded-xl shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-8">Admin Login</h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />

                    {error && <p className="text-red-600 text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-70"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <NavLink
                    to="/"
                    className="mt-8 text-blue-600 hover:underline block text-center w-full"
                >
                    ← Back to Role Selection
                </NavLink>
            </div>
        </div>
    );
}

export default AdminLogin;
