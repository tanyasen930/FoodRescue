const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const pickupRoutes = require("./routes/pickupRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const {
  updateExpiredDonations,
} = require("./controllers/expiryController");
const app = express();

const PORT = process.env.PORT || 8000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
connectDB();

// Check expired donations every 5 minutes
setInterval(() => {
  updateExpiredDonations();
}, 5 * 60 * 1000);

// Run once when server starts
updateExpiredDonations();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/pickups", pickupRoutes);
app.use("/api/analytics", analyticsRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FoodRescue Backend is running 🚀",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`FoodRescue Server running on port ${PORT}`);
});