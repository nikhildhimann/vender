// src/pages/Vendors.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function Vendors() {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Please login again");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:3000/api/admin/vendors", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setVendors(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load vendors");
                setLoading(false);
            }
        };

        fetchVendors();
    }, []);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:3000/api/admin/approve/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setVendors(vendors.map((v) => (v._id === id ? { ...v, isApproved: true } : v)));
        } catch (err) {
            alert("Failed to approve");
        }
    };

    const handleReject = async (id) => {
        if (!window.confirm("Reject and delete this vendor?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/api/admin/reject/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setVendors(vendors.filter((v) => v._id !== id));
        } catch (err) {
            alert("Failed to reject");
        }
    };

    if (loading) return <p className="text-gray-600">Loading vendors...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Vendors</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {vendors.map((vendor) => (
                            <tr key={vendor._id}>
                                <td className="px-6 py-4">{vendor.name}</td>
                                <td className="px-6 py-4">{vendor.email}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            vendor.isApproved
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {vendor.isApproved ? "Approved" : "Pending"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {!vendor.isApproved && (
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleApprove(vendor._id)}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(vendor._id)}
                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Vendors;
