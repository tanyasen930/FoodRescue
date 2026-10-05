
const mongoose = require("mongoose");
const Donation = require("../models/Donation");

// GET AVAILABLE DONATIONS
const getAvailableDonations = async (req, res) => {
  try {
    if (req.user.accountType !== "organization") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Organizations only.",
      });
    }

    const donations = await Donation.find({
      status: "pending",
      bestBefore: { $gt: new Date() },
    })
      .populate("donor", "fullName phone email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    console.error("Get Available Donations Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching donations.",
    });
  }
};

// ACCEPT DONATION
const acceptDonation = async (req, res) => {
  try {
    if (req.user.accountType !== "organization") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Organizations only.",
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
      status: "pending",
      bestBefore: { $gt: new Date() },
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message:
          "Donation not found, expired, or already accepted.",
      });
    }

    donation.status = "accepted";
    donation.organization = req.user.userId;

    await donation.save();

    res.status(200).json({
      success: true,
      message: "Donation accepted successfully.",
      donation,
    });
  } catch (error) {
    console.error("Accept Donation Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while accepting donation.",
    });
  }
};

// GET MY ACCEPTED DONATIONS
const getMyAcceptedDonations = async (req, res) => {
  try {
    if (req.user.accountType !== "organization") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Organizations only.",
      });
    }

    const donations = await Donation.find({
      organization: req.user.userId,
    })
      .populate("donor", "fullName phone email")
      .populate("pickupPartner", "fullName phone email")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    console.error("Get Accepted Donations Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching accepted donations.",
    });
  }
};

module.exports = {
  getAvailableDonations,
  acceptDonation,
  getMyAcceptedDonations,
};

