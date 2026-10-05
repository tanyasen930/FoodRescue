const mongoose = require("mongoose");
const Donation = require("../models/Donation");

// Get available pickups
const getAvailablePickups = async (req, res) => {
  try {
    if (req.user.accountType !== "pickup") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Pickup partners only.",
      });
    }

    const donations = await Donation.find({
      status: "accepted",
      pickupPartner: null,
      bestBefore: { $gt: new Date() },
    })
      .populate("donor", "fullName phone email")
      .populate(
        "organization",
        "fullName phone email"
      )
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    console.error(
      "Get Available Pickups Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while fetching pickups.",
    });
  }
};

// Accept pickup
const acceptPickup = async (req, res) => {
  try {
    if (req.user.accountType !== "pickup") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Pickup partners only.",
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donation ID.",
      });
    }

    const donation = await Donation.findOne({
      _id: id,
      status: "accepted",
      pickupPartner: null,
      bestBefore: { $gt: new Date() },
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message:
          "Donation is no longer available for pickup.",
      });
    }

    donation.pickupPartner = req.user.userId;
    donation.status = "pickup_assigned";

    await donation.save();

    res.status(200).json({
      success: true,
      message: "Pickup accepted successfully.",
      donation,
    });
  } catch (error) {
    console.error(
      "Accept Pickup Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while accepting pickup.",
    });
  }
};

// Get my pickups
const getMyPickups = async (req, res) => {
  try {
    if (req.user.accountType !== "pickup") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Pickup partners only.",
      });
    }

    const donations = await Donation.find({
      pickupPartner: req.user.userId,
    })
      .populate("donor", "fullName phone email")
      .populate(
        "organization",
        "fullName phone email"
      )
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    console.error(
      "Get My Pickups Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while fetching assigned pickups.",
    });
  }
};

// Mark picked up
const markPickedUp = async (req, res) => {
  try {
    if (req.user.accountType !== "pickup") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Pickup partners only.",
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donation ID.",
      });
    }

    const donation = await Donation.findOne({
      _id: id,
      pickupPartner: req.user.userId,
      status: "pickup_assigned",
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message:
          "Pickup assignment not found or status is invalid.",
      });
    }

    donation.status = "picked_up";

    await donation.save();

    res.status(200).json({
      success: true,
      message:
        "Food marked as picked up successfully.",
      donation,
    });
  } catch (error) {
    console.error(
      "Mark Picked Up Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while updating pickup status.",
    });
  }
};

// Mark delivered
const markDelivered = async (req, res) => {
  try {
    if (req.user.accountType !== "pickup") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Pickup partners only.",
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donation ID.",
      });
    }

    const donation = await Donation.findOne({
      _id: id,
      pickupPartner: req.user.userId,
      status: "picked_up",
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message:
          "Pickup not found or food has not been picked up.",
      });
    }

    donation.status = "delivered";

    await donation.save();

    res.status(200).json({
      success: true,
      message: "Food delivered successfully 🎉",
      donation,
    });
  } catch (error) {
    console.error(
      "Mark Delivered Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while marking delivery.",
    });
  }
};

module.exports = {
  getAvailablePickups,
  acceptPickup,
  getMyPickups,
  markPickedUp,
  markDelivered,
};