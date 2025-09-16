// src/modules/auth/auth.service.js
const User = require("./auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ENV = require("../../config/env");

const register = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const user = new User({ name, email, password, role });
  await user.save();

  return { id: user._id, email: user.email, role: user.role };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    ENV.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user: { id: user._id, name: user.name, role: user.role } };
};

module.exports = { register, login };
