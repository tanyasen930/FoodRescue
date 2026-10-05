const Donation = require("../models/Donation");

// CREATE DONATION
const createDonation = async (req, res) => {
  try {
    // Only donors can create donations
    if (req.user.accountType !== "donor") {
      return res.status(403).json({
        success: false,
        message: "Only donors can create donations.",
      });
    }

    const {
      foodName,
      foodCategory,
      quantity,
      unit,
      description,
      preparedAt,
      bestBefore,
      pickupAddress,
      pickupCity,
      pickupStart,
      pickupEnd,
      safetyConfirmed,
    } = req.body;

    // Required fields
    if (
      !foodName ||
      !foodCategory ||
      quantity === undefined ||
      !unit ||
      !preparedAt ||
      !bestBefore ||
      !pickupAddress ||
      !pickupCity ||
      !pickupStart ||
      !pickupEnd
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Food name validation
    if (foodName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Food name must contain at least 2 characters.",
      });
    }

    // Quantity validation
    const numericQuantity = Number(quantity);

    if (
      !Number.isFinite(numericQuantity) ||
      numericQuantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0.",
      });
    }

    // Unit validation
    if (!["kg", "servings"].includes(unit)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity unit.",
      });
    }

    // Safety confirmation
    if (safetyConfirmed !== true) {
      return res.status(400).json({
        success: false,
        message:
          "You must confirm that the donated food is safe.",
      });
    }

    const preparedDate = new Date(preparedAt);
    const bestBeforeDate = new Date(bestBefore);
    const pickupStartDate = new Date(pickupStart);
    const pickupEndDate = new Date(pickupEnd);

    // Invalid date check
    if (
      Number.isNaN(preparedDate.getTime()) ||
      Number.isNaN(bestBeforeDate.getTime()) ||
      Number.isNaN(pickupStartDate.getTime()) ||
      Number.isNaN(pickupEndDate.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid dates.",
      });
    }

    const now = new Date();

    // Best before must be future
    if (bestBeforeDate <= now) {
      return res.status(400).json({
        success: false,
        message:
          "Best-before time must be in the future.",
      });
    }

    // Prepared time cannot be in future
    if (preparedDate > now) {
      return res.status(400).json({
        success: false,
        message:
          "Food preparation time cannot be in the future.",
      });
    }

    // Best before must be after preparation
    if (bestBeforeDate <= preparedDate) {
      return res.status(400).json({
        success: false,
        message:
          "Best-before time must be after preparation time.",
      });
    }

    // Pickup end must be after pickup start
    if (pickupEndDate <= pickupStartDate) {
      return res.status(400).json({
        success: false,
        message:
          "Pickup end time must be after pickup start time.",
      });
    }

    // Pickup window cannot already be over
    if (pickupEndDate <= now) {
      return res.status(400).json({
        success: false,
        message:
          "Pickup window must be in the future.",
      });
    }

    // Pickup window should not extend beyond food expiry
    if (pickupEndDate > bestBeforeDate) {
      return res.status(400).json({
        success: false,
        message:
          "Pickup must be completed before the food expires.",
      });
    }

    const donation = await Donation.create({
      donor: req.user.userId,
      foodName: foodName.trim(),
      foodCategory,
      quantity: numericQuantity,
      unit,
      description: description?.trim() || "",
      preparedAt: preparedDate,
      bestBefore: bestBeforeDate,
      pickupAddress: pickupAddress.trim(),
      pickupCity: pickupCity.trim(),
      pickupStart: pickupStartDate,
      pickupEnd: pickupEndDate,
      safetyConfirmed: true,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Donation reported successfully.",
      donation,
    });
  } catch (error) {
    console.error("Create Donation Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating donation.",
    });
  }
};

// GET MY DONATIONS
const getMyDonations = async (req, res) => {
  try {
    if (req.user.accountType !== "donor") {
      return res.status(403).json({
        success: false,
        message: "Only donors can access donor donations.",
      });
    }

    const donations = await Donation.find({
      donor: req.user.userId,
    })
      .populate(
        "organization",
        "fullName email phone"
      )
      .populate(
        "pickupPartner",
        "fullName email phone"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    console.error("Get My Donations Error:", error);

    res.status(500).json({
      success: false,
      message:
        "Server error while fetching your donations.",
    });
  }
};

module.exports = {
  createDonation,
  getMyDonations,
};