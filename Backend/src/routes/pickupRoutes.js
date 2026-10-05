const express = require("express");

const {
  getAvailablePickups,
  acceptPickup,
  markPickedUp,
  markDelivered,
  getMyPickups,
} = require("../controllers/pickupController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Available donations for pickup
router.get("/donations", protect, getAvailablePickups);

// Accept pickup
router.put("/donations/:id/accept", protect, acceptPickup);

// Mark food as picked up
router.put("/donations/:id/picked-up", protect, markPickedUp);

// Mark food as delivered
router.put("/donations/:id/delivered", protect, markDelivered);

// My assigned pickups
router.get("/my-pickups", protect, getMyPickups);

module.exports = router;