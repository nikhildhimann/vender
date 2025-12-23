import { useState, useEffect } from "react";
import axios from "axios";

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Please login again");
                    setLoading(false);
                    return;
                }

                // Decode user ID from JWT (simple & safe – no library needed)
                const payload = JSON.parse(atob(token.split(".")[1]));
                setCurrentUserId(payload.id);

                const response = await axios.get("http://localhost:3000/api/products/all", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load products");
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    const isMyProduct = (vendorId) => vendorId === currentUserId;

    if (loading) return <p className="text-gray-600">Loading products...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Products (All Vendors)</h1>

            {products.length === 0 ? (
                <p className="text-gray-600">No products available yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className={`bg-white p-6 rounded-lg shadow ${
                                isMyProduct(product.vendor._id) ? "border-2 border-green-400" : ""
                            }`}
                        >
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <p className="text-gray-600 mt-2">
                                {product.description || "No description"}
                            </p>
                            <p className="text-2xl font-bold text-green-600 mt-4">
                                ₹{product.price}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                by {product.vendor?.name || "Unknown Shop"}
                            </p>

                            {isMyProduct(product.vendor._id) ? (
                                <p className="mt-6 text-sm text-green-700 font-medium">
                                    Your product
                                </p>
                            ) : (
                                <p className="mt-6 text-sm text-gray-500 italic">View only</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllProducts;
