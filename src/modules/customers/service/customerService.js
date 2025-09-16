const Customer = require("../models/Customer");

// Create new customer
const createCustomer = async (data) => {
    const customer = new Customer(data);
    return await customer.save();
};

// Get all customers
const getAllCustomers = async () => {
    return await Customer.find();
};

// Get single customer by ID
const getCustomerById = async (id) => {
    return await Customer.findById(id);
};

// Update customer
const updateCustomer = async (id, data) => {
    return await Customer.findByIdAndUpdate(
        id,
        { ...data, updated_at: Date.now() },
        { new: true }
    );
};

// Delete customer
const deleteCustomer = async (id) => {
    return await Customer.findByIdAndDelete(id);
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
