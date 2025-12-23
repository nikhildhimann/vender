require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");

const seedDatabase = async () => {
    try {
        await connectDB();
        console.log("Connected to MongoDB");

        // Drop collections and indexes
        try {
            await User.collection.drop();
            await Product.collection.drop();
            console.log("Dropped existing collections");
        } catch (err) {
            console.log("Collections don't exist yet, continuing...");
        }

        // Create default admin user
        const hashedPassword = await bcrypt.hash("admin", 10);
        const adminUser = await User.create({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin",
            isApproved: true,
        });
        console.log("Admin created:", adminUser.email);

        // Create a default vendor for products
        const vendorPassword = await bcrypt.hash("vendor", 10);
        const vendorUser = await User.create({
            name: "Default Vendor",
            email: "vendor@gmail.com",
            password: vendorPassword,
            role: "vendor",
            isApproved: true,
        });
        console.log("Vendor created:", vendorUser.email);

        // Create 10 sample products
        const sampleProducts = [
            {
                name: "Wireless Headphones",
                price: 79.99,
                description: "High-quality wireless headphones with noise cancellation",
                vendor: vendorUser._id,
            },
            {
                name: "USB-C Cable",
                price: 12.99,
                description: "Durable USB-C charging and data cable",
                vendor: vendorUser._id,
            },
            {
                name: "Phone Case",
                price: 19.99,
                description: "Protective phone case with shock absorption",
                vendor: vendorUser._id,
            },
            {
                name: "Screen Protector",
                price: 9.99,
                description: "Tempered glass screen protector for smartphones",
                vendor: vendorUser._id,
            },
            {
                name: "Portable Charger",
                price: 34.99,
                description: "20000mAh portable power bank with fast charging",
                vendor: vendorUser._id,
            },
            {
                name: "Laptop Stand",
                price: 29.99,
                description: "Adjustable aluminum laptop stand for better ergonomics",
                vendor: vendorUser._id,
            },
            {
                name: "Keyboard",
                price: 59.99,
                description: "Mechanical keyboard with RGB lighting",
                vendor: vendorUser._id,
            },
            {
                name: "Mouse",
                price: 24.99,
                description: "Wireless ergonomic mouse with precision tracking",
                vendor: vendorUser._id,
            },
            {
                name: "HDMI Cable",
                price: 14.99,
                description: "High-speed HDMI 2.1 cable for 4K resolution",
                vendor: vendorUser._id,
            },
            {
                name: "Webcam",
                price: 49.99,
                description: "1080p HD webcam with built-in microphone",
                vendor: vendorUser._id,
            },
        ];

        const products = await Product.insertMany(sampleProducts);
        console.log(`${products.length} products created successfully`);

        console.log("\n========== SEEDING COMPLETE ==========");
        console.log("Admin Credentials:");
        console.log("  Email: admin@gmail.com");
        console.log("  Password: admin");
        console.log("\nVendor Credentials:");
        console.log("  Email: vendor@gmail.com");
        console.log("  Password: vendor");
        console.log("=====================================\n");

        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error.message);
        process.exit(1);
    }
};

seedDatabase();
