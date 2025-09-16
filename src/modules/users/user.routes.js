const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

// CRUD Routes
router.post("/", userController.createUser.bind(userController));
router.get("/", userController.getUsers.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));

module.exports = router;
