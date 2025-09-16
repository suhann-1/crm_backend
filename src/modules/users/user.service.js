const User = require("./user.model");
const bcrypt = require("bcryptjs");

// Create a new user
async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({
    ...data,
    password: hashedPassword,
  });
  return await user.save();
}

// Get all users
async function getUsers() {
  return await User.find().select("-password");
}

// Get one user
async function getUserById(id) {
  return await User.findById(id).select("-password");
}

// Update user
async function updateUser(id, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return await User.findByIdAndUpdate(id, data, { new: true }).select(
    "-password"
  );
}

// Delete (soft delete → change status)
async function deleteUser(id) {
  return await User.findByIdAndUpdate(
    id,
    { status: "Inactive" },
    { new: true }
  );
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
