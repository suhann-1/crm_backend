const express = require("express");
const { createOrder, getOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
