const express = require('express');
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddle');

const router = express.Router();

// Helper function to get userId from token (if exists)
const extractUserId = (req) => {
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
    } catch (err) {
      console.warn('Invalid or expired token');
    }
  }
  return null;
};

// Helper function to get cart by user ID or guest ID
const getCart = async (userId, guestId) => {
  if (userId) return await Cart.findOne({ user: userId });
  if (guestId) return await Cart.findOne({ guestId });
  return null;
};

// POST /api/cart - Add product to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity, size, color, guestId } = req.body;
    const userId = extractUserId(req);

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0]?.url || '',
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        user: userId,
        guestId: guestId || `guest_${Date.now()}`,
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0]?.url || '',
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/cart - Update product quantity in cart
router.put('/', async (req, res) => {
  try {
    const { productId, size, color, quantity, guestId } = req.body;
    const userId = extractUserId(req);

    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/cart - Remove item from cart
router.delete('/', async (req, res) => {
  try {
    const { productId, size, color, guestId } = req.body;
    const userId = extractUserId(req);

    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    console.error('Error deleting from cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/cart - Retrieve the cart (returns empty cart if none)
router.get('/', async (req, res) => {
  try {
    const userId = extractUserId(req);
    const guestId = req.query.guestId;

    const cart = await getCart(userId, guestId);

    if (cart) {
      return res.json(cart);
    }

    // Return empty cart instead of 404
    return res.json({
      user: userId || null,
      guestId: guestId || null,
      products: [],
      totalPrice: 0,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/cart/merge - Merge guest cart with user cart
router.post('/merge', protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(200).json({ message: 'No products in guest cart' });
      }

      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const index = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (index > -1) {
            userCart.products[index].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        await userCart.save();
        await Cart.findOneAndDelete({ guestId });

        return res.status(200).json(userCart);
      } else {
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        return res.status(200).json(guestCart);
      }
    } else {
      if (userCart) return res.status(200).json(userCart);
      return res.status(404).json({ message: 'Guest cart not found' });
    }
  } catch (error) {
    console.error('Error merging carts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
