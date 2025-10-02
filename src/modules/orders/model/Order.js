const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  status: { 
    type: String, 
    enum: ["New", "In Progress", "Closed", "Cancelled"], 
    default: "New" 
  },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
