const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    foodName: {
      type: String,
      required: true,
      trim: true,
    },

    foodCategory: {
      type: String,
      enum: [
        "Cooked Food",
        "Packaged Food",
        "Fruits",
        "Vegetables",
        "Bakery",
        "Other",
      ],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unit: {
      type: String,
      enum: ["kg", "servings"],
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    preparedAt: {
      type: Date,
      required: true,
    },

    bestBefore: {
      type: Date,
      required: true,
    },

    pickupAddress: {
      type: String,
      required: true,
      trim: true,
    },

    pickupCity: {
      type: String,
      required: true,
      trim: true,
    },

    pickupStart: {
      type: Date,
      required: true,
    },

    pickupEnd: {
      type: Date,
      required: true,
    },

    safetyConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "matched",
        "accepted",
        "pickup_assigned",
        "picked_up",
        "delivered",
        "expired",
        "cancelled",
      ],
      default: "pending",
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Pickup partner assigned to this donation
    pickupPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", donationSchema);