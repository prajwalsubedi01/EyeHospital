require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();


app.use(cors()); // Enable CORS with options
app.use(express.json());


// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const teamRoutes= require('./routes/teamRoutes')
const noticeRoutes = require("./routes/noticeRoutes");
const galleryRoutes=require("./routes/galleryRoutes");
const serviceRoutes=require('./routes/serviceRoutes.js');

// Use the notice routes
app.use("/api/notice", noticeRoutes);
// Use the routes
app.use("/api/admin", adminRoutes);  

app.use("/api/team", teamRoutes);
//gallery routes
app.use('/api/gallery', galleryRoutes);
//service routes
app.use('/api/services', serviceRoutes);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log("✅ MongoDB Connected Successfully to EyeHospital Database");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Simple Route
app.get("/", (req, res) => {
  res.send("Backend is Running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0',() => console.log(`🚀 Server running on port ${PORT}`));
