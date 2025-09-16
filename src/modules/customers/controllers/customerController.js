const Customer = require("../model/Customer");

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();
        res.status(201).json(savedCustomer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update customer
exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updated_at: Date.now() },
            { new: true }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(updatedCustomer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get Customers by Group (Lead, Active, Inactive, VIP)
exports.getCustomersByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const customers = await Customer.find({ status });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Customer Status (manually change group)
exports.updateCustomerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Auto-update grouping logic
exports.autoUpdateStatus = async (req, res) => {
  try {
    const customers = await Customer.find();
    const now = new Date();

    for (let customer of customers) {
      const monthsSinceLastInteraction =
        (now - customer.lastInteraction) / (1000 * 60 * 60 * 24 * 30);

      if (customer.totalSpent > 50000) {
        customer.status = "VIP";
      } else if (monthsSinceLastInteraction > 6) {
        customer.status = "Inactive";
      } else if (customer.totalSpent > 0) {
        customer.status = "Active";
      } else {
        customer.status = "Lead";
      }
      await customer.save();
    }

    res.json({ message: "Customer statuses auto-updated ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
