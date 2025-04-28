require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

const corsOptions = {
    origin: ['https://aesthitic.netlify.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const teamRoutes = require('./routes/teamRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

// Use routes
app.use("/api/admin", adminRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/services", serviceRoutes);

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected Successfully to EyeHospital Database");
    } catch (error) {
        console.error("✗ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

connectDB();

app.get("/", (req, res) => {
    res.send("Backend is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});