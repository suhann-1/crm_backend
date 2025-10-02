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


const userRoutes = require("./src/modules/users/routes/userRoutes");
const customerRoutes = require("./src/modules/customers/routes/customerRoutes");
const noteRoutes = require("./src/modules/note/routes/noteRoutes");
const orderRoutes = require("./src/modules/orders/routes/orderRoutes");
const dashboardRoutes = require("./src/modules/dashboard/routes/dashboardRoutes");

app.use("/api/users", userRoutes); 
app.use("/api/customers",customerRoutes);
app.use("/api/notes",noteRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.listen(ENV.PORT, () => {
  console.log(` Server running on http://localhost:${ENV.PORT}`);
});

