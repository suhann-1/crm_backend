const Order = require("../../orders/model/Order");

const Customer = require("../../customers/model/Customer");

// Dashboard Overview
exports.getDashboard = async (req, res) => {
  try {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Pending follow-ups (today & tomorrow)
    const pendingFollowUps = await Order.find({
      followUpDate: { $gte: today, $lte: tomorrow }
    }).populate("customer", "name email");

    // Recent customer activity (last 7 days)
    const recentCustomers = await Customer.find({
      createdAt: { $gte: new Date(today.setDate(today.getDate() - 7)) }
    }).sort({ createdAt: -1 });

    // Sales overview
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const ordersThisMonth = await Order.find({ createdAt: { $gte: startOfMonth } }).countDocuments();
    const closedDeals = await Order.find({ status: "Closed", createdAt: { $gte: startOfMonth } }).countDocuments();

    // Sales total by status (chart friendly)
    const salesByStatus = await Order.aggregate([
      { $group: { _id: "$status", total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]);

    res.json({
      pendingFollowUps,
      recentCustomers,
      overview: {
        ordersThisMonth,
        closedDeals
      },
      salesByStatus
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
