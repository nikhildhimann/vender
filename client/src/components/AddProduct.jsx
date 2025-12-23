// src/pages/vendor/AddProduct.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function AddProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please login again");
                setLoading(false);
                return;
            }

            await axios.post("http://localhost:3000/api/products/add", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccess(true);

            // Decode role from JWT (simple & safe)
            const payload = JSON.parse(atob(token.split(".")[1]));
            const role = payload.role;

            // Redirect to correct "My Products" page
            if (role === "admin") {
                setTimeout(() => navigate("/admin-dashboard/my-catalog"), 2000);
            } else {
                setTimeout(() => navigate("/vendor-dashboard/my-catalog"), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.msg || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
                <div className="space-y-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price (₹)"
                        required
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
                    />

                    {error && <p className="text-red-600 text-center">{error}</p>}
                    {success && (
                        <p className="text-green-600 text-center text-xl">
                            Product added successfully!
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-70"
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
