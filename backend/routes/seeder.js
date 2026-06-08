const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const User = require("../models/User");
const products = require("../data/products");

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();

    // Get the first user to assign as the owner
    const users = await User.find();
    if (users.length === 0) throw new Error("No users found to assign to products");

    const adminUser = users[0];

    // Assign user ID to each product
    const seededProducts = products.map((product) => ({
      ...product,
      user: adminUser._id,
    }));

    await Product.insertMany(seededProducts);

    console.log("✅ Products seeded from data/products.js");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedProducts();
