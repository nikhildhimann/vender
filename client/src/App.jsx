// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router";

// Public pages
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import VendorLogin from "./pages/VendorLogin.jsx";
import VendorSignup from "./pages/VendorSignup.jsx";

// Dashboards (directly in pages)
import VendorDashboard from "./pages/VendorDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

// Shared components (used as pages)
import AllProducts from "./components/AllProducts.jsx";
import MyCatalog from "./components/MyCatalog.jsx";
import AddProduct from "./components/AddProduct.jsx";
import Settings from "./components/Settings.jsx";

// Admin only
import Vendors from "./pages/Vendors.jsx"; // if you have it in pages, otherwise move it

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/vendor-login" element={<VendorLogin />} />
                <Route path="/vendor-signup" element={<VendorSignup />} />

                {/* Vendor Dashboard - nested routes */}
                <Route path="/vendor-dashboard" element={<VendorDashboard />}>
                    <Route index element={<AllProducts />} /> {/* Default */}
                    <Route path="all-products" element={<AllProducts />} /> {/* All Products */}
                    <Route path="my-catalog" element={<MyCatalog />} /> {/* My Catalog */}
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="settings" element={<Settings />} />
                </Route>

                {/* Admin Dashboard - nested routes */}
                <Route path="/admin-dashboard" element={<AdminDashboard />}>
                    <Route index element={<AllProducts />} /> {/* Default */}
                    <Route path="all-products" element={<AllProducts />} /> {/* All Products */}
                    <Route path="my-catalog" element={<MyCatalog />} />{" "}
                    {/* My Catalog (admin's own) */}
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="vendors" element={<Vendors />} /> {/* Extra tab for admin */}
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;