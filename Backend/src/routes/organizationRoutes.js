const express = require("express");

const {
  getAvailableDonations,
  acceptDonation,
  getMyAcceptedDonations,
} = require("../controllers/organizationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/donations", protect, getAvailableDonations);

router.put(
  "/donations/:id/accept",
  protect,
  acceptDonation
);

router.get(
  "/my-donations",
  protect,
  getMyAcceptedDonations
);

module.exports = router;