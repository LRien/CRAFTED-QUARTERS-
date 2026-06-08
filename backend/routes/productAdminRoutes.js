const Product = require("../models/Product");
const { protect, admin} = require ("../middleware/authMiddle");
const express = require("express");

const router = express.Router();

// Get all products
router.get("/", protect, admin, async(req, res) =>{
    try {
        const products = await Product.find({});
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error getting all products"});
    }
});

module.exports = router;