const Donation = require("../models/Donation");

// Mark expired donations automatically
const updateExpiredDonations = async () => {
  try {
    const result = await Donation.updateMany(
      {
        bestBefore: { $lte: new Date() },
        status: {
          $in: [
            "pending",
            "matched",
            "accepted",
            "pickup_assigned",
          ],
        },
      },
      {
        $set: {
          status: "expired",
        },
      }
    );

    if (result.modifiedCount > 0) {
      console.log(
        `⏰ ${result.modifiedCount} donation(s) marked as expired`
      );
    }
  } catch (error) {
    console.error(
      "Expiry Update Error:",
      error.message
    );
  }
};

module.exports = {
  updateExpiredDonations,
};