const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth");

// In routes/product.js
router.post('/add', authMiddleware, async (req, res) => {
    if (req.user.role === "vendor" && !req.user.isApproved) {
        return res.status(403).json({ msg: "Access denied" });
    }

    const { name, price, description } = req.body;

    try {
        const newProduct = new Product({
        name,
        price,
        description,
        vendor: req.user.id
        });

        await newProduct.save();
        res.json({ msg: 'Product added', product: newProduct });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get("/my", authMiddleware, async (req, res) => {
    if (req.user.role === "vendor" && !req.user.isApproved) {
        return res.status(403).json({ msg: "Access denied – waiting for approval" });
    }


    try {
        const products = await Product.find({ vendor: req.user.id }).populate("vendor", "name");
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// In routes/product.js – add this route
router.get('/my', authMiddleware, async (req, res) => {
    if (req.user.role !== 'vendor') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    try {
        const products = await Product.find({ vendor: req.user.id });
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Delete product (only owner)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        if (product.vendor.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'Not your product' });
        }

        await product.deleteOne();
        res.json({ msg: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update product (only owner)
router.put('/update/:id', authMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        if (product.vendor.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'Not your product' });
        }

        const { name, price, description } = req.body;
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description ?? product.description;

        await product.save();
        res.json({ msg: 'Product updated', product });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});


router.get("/all", authMiddleware, async (req, res) => {
    try {
        const products = await Product.find().populate("vendor", "name email");
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;