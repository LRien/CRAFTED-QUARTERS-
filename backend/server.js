const dotenv = require("dotenv");

// Load env first!
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


// Connect to DB
connectDB();

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrdersRoutes = require("./routes/adminOrdersRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("WELCOME TO THE BACKEND MWEHEHHE");
});

// Import Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscriberRoutes);

// Admin
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrdersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
