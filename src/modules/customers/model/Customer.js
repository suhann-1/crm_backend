const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
    country: { type: String }
}, { _id: false });

const customerSchema = new mongoose.Schema({
    // customer_id: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: addressSchema },
    company_name: { type: String },
    // customer_group: { type: String, enum: ["Lead", "Active", "Inactive"], default: "Lead" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: {
    type: String,
    enum: ["Lead", "Active", "Inactive", "VIP"],
    default: "Lead"
  },
  lastInteraction: { type: Date, default: Date.now }, // for activity tracking
  totalSpent: { type: Number, default: 0 } // for VIP logic
});

module.exports = mongoose.model("Customer", customerSchema);
