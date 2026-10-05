const express = require("express");

const {
  createDonation,
  getMyDonations,
} = require("../controllers/donationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new donation
router.post("/", protect, createDonation);

// Get donations of logged-in donor
router.get("/my", protect, getMyDonations);

module.exports = router;