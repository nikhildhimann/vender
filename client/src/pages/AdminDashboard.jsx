// src/pages/admin/AdminDashboard.jsx
import { NavLink, Outlet } from "react-router";

function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg relative">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-600">Admin Dashboard</h2>
                </div>

                <nav className="mt-8">
                    {/* All products from everyone */}
                    <NavLink
                        to="/admin-dashboard/all-products"
                        className={({ isActive }) =>
                            `block py-4 px-6 text-lg font-medium transition ${
                                isActive
                                    ? "bg-blue-100 text-blue-700 border-r-4 border-blue-600"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        Catalog (All Products)
                    </NavLink>

                    {/* Admin's own products - editable */}
                    <NavLink
                        to="/admin-dashboard/my-catalog"
                        className={({ isActive }) =>
                            `block py-4 px-6 text-lg font-medium transition ${
                                isActive
                                    ? "bg-blue-100 text-blue-700 border-r-4 border-blue-600"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        My Products
                    </NavLink>

                    {/* Add product for admin */}
                    <NavLink
                        to="/admin-dashboard/add-product"
                        className={({ isActive }) =>
                            `block py-4 px-6 text-lg font-medium transition ${
                                isActive
                                    ? "bg-blue-100 text-blue-700 border-r-4 border-blue-600"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        Add Product
                    </NavLink>

                    {/* Vendors management */}
                    <NavLink
                        to="/admin-dashboard/vendors"
                        className={({ isActive }) =>
                            `block py-4 px-6 text-lg font-medium transition ${
                                isActive
                                    ? "bg-blue-100 text-blue-700 border-r-4 border-blue-600"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        Vendors
                    </NavLink>

                    <NavLink
                        to="/admin-dashboard/settings"
                        className={({ isActive }) =>
                            `block py-4 px-6 text-lg font-medium transition ${
                                isActive
                                    ? "bg-blue-100 text-blue-700 border-r-4 border-blue-600"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        Settings
                    </NavLink>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <NavLink to="/" className="text-red-600 hover:underline">
                        ← Logout
                    </NavLink>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminDashboard;