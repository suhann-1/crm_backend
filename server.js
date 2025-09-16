const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/index");
const ENV = require("./src/config/env");

const app = express()

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("CRM Backend is running...");
});

const authRoutes = require("./src/modules/auth/auth.routes");
const userRoutes = require("./src/modules/users/user.routes");
const customerRoutes = require("./src/modules/customers/routes/customerRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/customers",customerRoutes),
app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
});
