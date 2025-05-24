require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// CORS setup
const allowedOrigins = [
    'http://localhost:5173',      // Local development frontend
    'https://aesthitic.netlify.app' // Deployed frontend on Netlify
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const teamRoutes = require('./routes/teamRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
// Use routes
app.get('/ping', (req, res) => {
  res.status(200).send('✅ Server is awake and running!');
});
app.use("/api/admin", adminRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointment", appointmentRoutes);
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

// Test route
app.get("/", (req, res) => {
    res.send("✅ Backend is Running Successfully");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
