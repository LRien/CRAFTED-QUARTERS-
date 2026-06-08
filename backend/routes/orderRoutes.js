const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddle");

const router = express.Router();

// @route   GET /api/orders/my-orders
// @desc    Get logged-in user's orders
// @access  Private
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      orders,
      totalOrders: orders.length,
    });
  } catch (error) {
    console.error("❌ Error fetching user orders:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order details by ID
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Secure: Only allow user to fetch their own order
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Error fetching order details:", error);
    res.status(500).json({ message: "Server error while fetching order" });
  }
});

module.exports = router;
