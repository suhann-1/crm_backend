const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

// Create a new customer
router.post("/", customerController.createCustomer);

// Get all customers
router.get("/", customerController.getAllCustomers);

// Get a single customer by ID
router.get("/:id", customerController.getCustomerById);

// Update a customer
router.put("/:id", customerController.updateCustomer);

// Delete a customer
router.delete("/:id", customerController.deleteCustomer);

// // //add order
// // router.post("/:id/orders", customerController.addOrder);

// router.put("/orders/:orderId", customerController.updateOrder);
// router.delete("/orders/:orderId", customerController.deleteOrder);
//get all details
router.get("/:id/details", customerController.getCustomerDetails);
// Grouping
router.get("/group/:status", customerController.getCustomersByStatus);
router.put("/:id/status", customerController.updateCustomerStatus);
// // Get single customer + history (notes, orders)
// router.get("/:id/details", customerController.getCustomerFullDetails);

// Auto-update 
router.put("/auto/update-status", customerController.autoUpdateStatus);

module.exports = router;
