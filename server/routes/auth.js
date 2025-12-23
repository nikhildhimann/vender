const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role: "vendor",
            isApproved: false,
        });

        await user.save();
        res.json({ msg: "Signup successful. Waiting for admin approval." });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        if (user.role !== role) return res.status(400).json({ msg: "Wrong role" });

        if (user.role === "vendor" && !user.isApproved) {
            return res.status(400).json({ msg: "Account not approved by admin yet" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                isApproved: user.isApproved,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, role: user.role, name: user.name });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});


// Get profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('name email');
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (name) user.name = name;
        if (email) user.email = email;
        await user.save();
        res.json({ msg: 'Profile updated' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Change password
router.put('/password', authMiddleware, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Current password wrong' });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ msg: 'Password changed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;