const Donation = require("../models/Donation");

// Get overall impact analytics
const getImpactAnalytics = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();

    const completedDeliveries = await Donation.countDocuments({
      status: "delivered",
    });

    // Total food rescued from delivered donations
    const foodRescuedResult = await Donation.aggregate([
      {
        $match: {
          status: "delivered",
        },
      },
      {
        $group: {
          _id: "$unit",
          total: { $sum: "$quantity" },
        },
      },
    ]);

    let totalFoodRescuedKg = 0;
    let totalFoodRescuedServings = 0;

    foodRescuedResult.forEach((item) => {
      if (item._id === "kg") {
        totalFoodRescuedKg = item.total;
      }

      if (item._id === "servings") {
        totalFoodRescuedServings = item.total;
      }
    });

    // Unique organizations that received food
    const organizationsResult = await Donation.distinct(
      "organization",
      {
        status: "delivered",
        organization: { $ne: null },
      }
    );

    const organizationsServed = organizationsResult.length;

    // Monthly statistics
    const monthlyStats = await Donation.aggregate([
      {
        $match: {
          status: "delivered",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$updatedAt" },
            month: { $month: "$updatedAt" },
          },
          donations: { $sum: 1 },
          foodKg: {
            $sum: {
              $cond: [
                { $eq: ["$unit", "kg"] },
                "$quantity",
                0,
              ],
            },
          },
          servings: {
            $sum: {
              $cond: [
                { $eq: ["$unit", "servings"] },
                "$quantity",
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Food category statistics
    const categoryStats = await Donation.aggregate([
      {
        $match: {
          status: "delivered",
        },
      },
      {
        $group: {
          _id: "$foodCategory",
          donations: { $sum: 1 },
          quantity: { $sum: "$quantity" },
        },
      },
      {
        $sort: {
          donations: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,

      overview: {
        totalDonations,
        completedDeliveries,
        organizationsServed,
        totalFoodRescuedKg,
        totalFoodRescuedServings,
      },

      monthlyStats,

      categoryStats,
    });
  } catch (error) {
    console.error("Impact Analytics Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching impact analytics",
    });
  }
};

module.exports = {
  getImpactAnalytics,
};