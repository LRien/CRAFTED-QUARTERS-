const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddle");

const router = express.Router();

// Creating a checkout session
router.post('/', protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",  // ✅ fixed: lowercase "pending"
      isPaid: false
    });

    console.log(`✅ Checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    res.status(500).json({ message: "Server error while creating checkout" });
  }
});

// Updating the checkout process (payment)
router.put('/:id/pay', protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (!paymentStatus) {
      return res.status(400).json({ message: "Missing paymentStatus" });
    }

    if (paymentStatus.toLowerCase() === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = "paid";
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();

      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid payment status" });
    }
  } catch (error) {
    console.error("❌ Error updating checkout payment:", error);
    res.status(500).json({ message: "Server error during payment update" });
  }
});

// Finalizing Checkout
router.post('/:id/finalize', protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout is already finalized" });
    }

    if (!checkout.isPaid) {
      return res.status(400).json({ message: "Checkout is not paid" });
    }

    // Create final order based on the checkout details
    const order = await Order.create({
      orderItems: checkout.checkoutItems,
      user: checkout.user,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      isDelivered: false,
      paymentStatus: "paid",  // ✅ force "paid"
      paymentDetails: checkout.paymentDetails
    });

    // Mark the checkout as finalized
    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    // Delete the cart associated with the user
    await Cart.findOneAndDelete({ user: checkout.user });

    res.status(201).json(order);
  } catch (error) {
    console.error("❌ Error finalizing checkout:", error);
    res.status(500).json({ message: "Server error during checkout finalization" });
  }
});

module.exports = router;
