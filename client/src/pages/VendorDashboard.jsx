// src/pages/vendor/VendorDashboard.jsx
import { NavLink, Outlet } from "react-router";

function VendorDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg relative">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-green-600">Vendor Dashboard</h2>
                </div>

                <nav className="mt-8">
                    {/* New: Products (All) */}
                    <NavLink
                        to="/vendor-dashboard/all-products"
                        className={({ isActive }) =>
                            `block py-4 px-6 text-lg font-medium transition ${
                                isActive
                                    ? "bg-green-100 text-green-700 border-r-4 border-green-600"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        Products (All Vendors)
                    </NavLink>

                    {/* New: My Catalog */}
                    <NavLink
                        to="/vendor-dashboard/my-catalog"
                        className={({ isActive }) =>
                            `block py-4 px-6 text-lg font-medium transition ${
                                isActive
                                    ? "bg-green-100 text-green-700 border-r-4 border-green-600"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        My Catalog
                    </NavLink>

                    <NavLink
                        to="/vendor-dashboard/add-product"
                        className={({ isActive }) =>
                            `block py-4 px-6 text-lg font-medium transition ${
                                isActive
                                    ? "bg-green-100 text-green-700 border-r-4 border-green-600"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        Add Product
                    </NavLink>

                    <NavLink
                        to="/vendor-dashboard/settings"
                        className={({ isActive }) =>
                            `block py-4 px-6 text-lg font-medium transition ${
                                isActive
                                    ? "bg-green-100 text-green-700 border-r-4 border-green-600"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        Settings
                    </NavLink>
                </nav>

                {/* Logout at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <NavLink to="/" className="text-red-600 hover:underline">
                        ← Logout
                    </NavLink>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-10">
                <Outlet /> {/* Will show Products.jsx or MyCatalog.jsx etc. */}
            </div>
        </div>
    );
}

export default VendorDashboard;
