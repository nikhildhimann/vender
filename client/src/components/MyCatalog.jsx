// src/pages/vendor/MyCatalog.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function MyCatalog() {
    const [myProducts, setMyProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null); // which product is being edited
    const [editForm, setEditForm] = useState({ name: "", price: "", description: "" });

    useEffect(() => {
        const fetchMyProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Please login again");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:3000/api/products/my", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setMyProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load your products");
                setLoading(false);
            }
        };

        fetchMyProducts();
    }, []);

    // Delete product
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/api/products/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMyProducts(myProducts.filter((p) => p._id !== id));
        } catch (err) {
            alert("Failed to delete");
        }
    };

    // Start editing
    const startEdit = (product) => {
        setEditingId(product._id);
        setEditForm({
            name: product.name,
            price: product.price,
            description: product.description || "",
        });
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);
    };

    // Save edited product
    const handleUpdate = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:3000/api/products/update/${id}`,
                editForm,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setMyProducts(myProducts.map((p) => (p._id === id ? response.data.product : p)));
            setEditingId(null);
        } catch (err) {
            alert("Failed to update");
        }
    };

    if (loading) return <p className="text-gray-600">Loading your products...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">My Catalog</h1>

            {myProducts.length === 0 ? (
                <p className="text-gray-600">
                    You have no products yet. Go to "Add Product" to create one.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white p-6 rounded-lg shadow border-2 border-green-400"
                        >
                            {editingId === product._id ? (
                                // Edit form
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, name: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                    <input
                                        type="number"
                                        value={editForm.price}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, price: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                    <textarea
                                        value={editForm.description}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                description: e.target.value,
                                            })
                                        }
                                        rows="3"
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleUpdate(product._id)}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Normal view
                                <>
                                    <h3 className="text-xl font-semibold">{product.name}</h3>
                                    <p className="text-gray-600 mt-2">
                                        {product.description || "No description"}
                                    </p>
                                    <p className="text-2xl font-bold text-green-600 mt-4">
                                        ₹{product.price}
                                    </p>

                                    <div className="mt-6 flex space-x-4">
                                        <button
                                            onClick={() => startEdit(product)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyCatalog;
