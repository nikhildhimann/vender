// src/pages/VendorSignup.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { apiPost } from "../utils/api"; 

function VendorSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await apiPost("/auth/signup", formData);

            setSuccess(true);
            // Optional: auto go to login after 2 seconds
            setTimeout(() => navigate("/vendor-login"), 2000);
        } catch (err) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-10 rounded-xl shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-8">Vendor Signup</h2>

                {success ? (
                    <div className="text-center">
                        <p className="text-green-600 text-xl mb-4">Signup successful!</p>
                        <p className="text-gray-600">
                            Waiting for admin approval. You will be redirected to login...
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSignup} className="space-y-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        />

                        {error && <p className="text-red-600 text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-70"
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                    </form>
                )}

                <p className="mt-6 text-center text-gray-600">
                    After signup, admin will approve your account.
                </p>

                <NavLink
                    to="/vendor-login"
                    className="mt-8 text-green-600 hover:underline block text-center w-full"
                >
                    ← Back to Vendor Login
                </NavLink>
            </div>
        </div>
    );
}

export default VendorSignup;