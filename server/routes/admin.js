// routes/admin.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth"); // your JWT middleware

// Protect all admin routes
router.use(authMiddleware);
router.use((req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Admin only" });
    next();
});

// Get all vendors
router.get("/vendors", async (req, res) => {
    try {
        const vendors = await User.find({ role: "vendor" }).select("-password");
        res.json(vendors);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Approve vendor
router.put("/approve/:id", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isApproved: true });
        res.json({ msg: "Vendor approved" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Reject vendor (delete)
router.delete("/reject/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: "Vendor rejected and removed" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
