const express = require("express");

const {
  getImpactAnalytics,
} = require("../controllers/analyticsController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get impact analytics
router.get("/impact", protect, getImpactAnalytics);

module.exports = router;