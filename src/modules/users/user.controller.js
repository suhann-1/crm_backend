const userService = require("./user.service");

// Create user
async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all users
async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get single user
async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update user
async function updateUser(req, res) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ message: "User updated", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete user (soft delete)
async function deleteUser(req, res) {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json({ message: "User deactivated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
