// src/pages/vendor/Settings.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function Settings() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Load current profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setName(response.data.name);
                setEmail(response.data.email);
                setLoading(false);
            } catch (err) {
                setError("Failed to load profile");
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // Update profile (name/email)
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "http://localhost:3000/api/auth/profile",
                { name, email },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessage("Profile updated successfully");
        } catch (err) {
            setError("Failed to update profile");
        }
    };

    // Change password
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "http://localhost:3000/api/auth/password",
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessage("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            setError(err.response?.data?.msg || "Failed to change password");
        }
    };

    if (loading) return <p className="text-gray-600">Loading settings...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="space-y-10">
                {/* Profile Update */}
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
                    <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>

                {/* Change Password */}
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
                    <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-6">
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current Password"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
                        />
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                        >
                            Change Password
                        </button>
                    </form>
                </div>

                {(message || error) && (
                    <p className={message ? "text-green-600" : "text-red-600"}>
                        {message || error}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Settings;
