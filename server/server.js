require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path =require("path");
const app = express();
const assetRoutes =require("./routes/assetRoutes");
const allocationRoutes =require("./routes/allocationRoutes");
const employeeDashboardRoutes =require("./routes/employeeDashboardRoutes");
const maintenanceRoutes =require("./routes/maintenanceRoutes");
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });
app.use(express.static(path.join(__dirname,"client")));
// Routes
const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

const employeeRoutes =require("./routes/employeeRoutes");

app.use("/api/employees",employeeRoutes);
app.use("/api/assets",assetRoutes);
app.use("/api/allocations",allocationRoutes);
app.use("/api/employee",employeeDashboardRoutes);
app.use("/api/maintenance",maintenanceRoutes);

// Test Route
app.get("/", (req, res) => {
  res.sendFile( path.join(__dirname,"client","index.html"));
  res.send("Server Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});