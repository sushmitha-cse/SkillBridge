const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const skillRoutes = require("./modules/skill/skill.routes");
const mentorRoutes = require("./modules/mentor/mentor.routes");
const bookingRoutes = require("./modules/booking/booking.routes");
const reviewRoutes = require("./modules/review/review.routes");
const availabilityRoutes = require("./modules/availability/availability.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SkillBridge API is running",
  });
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/availability", availabilityRoutes);

module.exports = app;
