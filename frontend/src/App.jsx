import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import FeaturedMentors from "./components/FeaturedMentors";
import WhySkillBridge from "./components/WhySkillBridge";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Mentors from "./pages/Mentors";
import MentorProfile from "./pages/MentorProfile";
import MentorMyProfile from "./pages/MentorMyProfile";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import MentorBookings from "./pages/MentorBookings";
import Profile from "./pages/Profile";
import Availability from "./pages/Availability";
import Payment from "./pages/Payment";
import Payments from "./pages/Payments";
import Review from "./pages/Review";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedMentors />
      <WhySkillBridge />
      <CTA />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Authentication */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* Mentors */}
      <Route
        path="/mentors"
        element={<Mentors />}
      />

      <Route
        path="/mentors/:id"
        element={<MentorProfile />}
      />

      {/* Student Booking */}
      <Route
        path="/bookings/new"
        element={<Booking />}
      />

      <Route
        path="/bookings"
        element={<MyBookings />}
      />

      {/* Mentor Bookings */}
      <Route
        path="/mentor-bookings"
        element={<MentorBookings />}
      />

      {/* Student Profile */}
      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* Mentor Profile */}
      <Route
        path="/mentor/profile"
        element={<MentorMyProfile />}
      />

      {/* Mentor Availability */}
      <Route
        path="/availability"
        element={<Availability />}
      />

      {/* Individual Payment */}
      <Route
        path="/payment"
        element={<Payment />}
      />

      {/* Payment History */}
      <Route
        path="/payments"
        element={<Payments />}
      />
      <Route
        path="/reviews"
        element={<Review />}
      />
    </Routes>
  );
}

export default App;

