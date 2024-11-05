require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import Route Handlers
const { connectToMongoDB } = require("./connection");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const packageRoutes = require("./routes/packageRoutes");
const carRoutes = require("./routes/carRoutes");
const placesRoutes = require("./routes/placesRoutes");
const contactRoutes = require("./routes/contactRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const popularDestinationsRoutes = require("./routes/popularDestinationsRoutes");

const app = express();
const PORT = process.env.PORT || 8000; // Use PORT from env or default to 8000

// MongoDB connection
const mongoURL = process.env.MONGODB_URL;
connectToMongoDB(mongoURL).then(() => console.log("MongoDB Connected"));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // to parse form data
app.use(cookieParser());

// Enable CORS for all origins
app.use(cors({
  origin: function (origin, callback) {
    callback(null, origin); // Reflect the request origin
  },
  credentials: true, // Allow credentials like cookies
}));

// Routes
app.use("/auth", authRoutes); // Auth-related routes
app.use("/booking", bookingRoutes); // Booking-related routes
app.use("/packages", packageRoutes); // Package-related routes
app.use('/places', placesRoutes);
app.use("/cars", carRoutes); // Car-related routes
app.use('/contact', contactRoutes);
app.use("/testimonials", testimonialRoutes); // Testimonial-related routes
app.use("/popular-destinations", popularDestinationsRoutes); // Popular destinations

// Start server
app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
 