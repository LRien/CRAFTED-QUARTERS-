const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddle');

const router = express.Router();

/* =========================
   CREATE PRODUCT
========================= */
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      user: req.user._id
    });

    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

/* =========================
   GET ALL PRODUCTS
========================= */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

/* =========================
   STATIC ROUTES (MUST BE FIRST)
========================= */

// NEW ARRIVALS
router.get('/new-arrivals', async (req, res) => {
  try {
    console.log("🔥 new-arrivals hit");

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// BEST SELLER
router.get('/best-seller', async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// SIMILAR PRODUCTS
router.get('/similar/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    const similar = await Product.find({
      _id: { $ne: id },
      category: product.category
    }).limit(4);

    res.json(similar);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

/* =========================
   DYNAMIC ROUTE LAST
========================= */

// GET SINGLE PRODUCT
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;