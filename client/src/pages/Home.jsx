// src/pages/Home.js
import { NavLink } from "react-router";

function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8">Welcome to Vendor-Admin System</h1>
            <p className="text-xl mb-12">Select your role to continue</p>

            <div className="space-x-8">
                <NavLink
                    to="/admin-login"
                    className="px-12 py-8 text-2xl font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition inline-block"
                >
                    I am Admin
                </NavLink>

                <NavLink
                    to="/vendor-login"
                    className="px-12 py-8 text-2xl font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition inline-block"
                >
                    I am Vendor
                </NavLink>
            </div>
        </div>
    );
}

export default Home;
