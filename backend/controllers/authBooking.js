const express = require("express");

const Booking = require("../models/booking");
const { getUser } = require("../services/auth");

async function handleCreateBookingById(req, res) {
  try {

    const { Email, From, Destination, DateOfDeparture } = req.body;


    // Create a new booking instance
    const newBooking = new Booking({
      from: From,
      to: Destination,
      date: DateOfDeparture,
      createdBy: Email,
      createdAt: Date.now(),
      isTraveled: false,
    });

    await User.findOneAndUpdate({ email: Email }, {
      $push: { bookingHistory: newBooking._id }
    });

    // Save the booking to the database
    await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Booking Failed" });
  }
}

async function handleDeleteBookingById(req, res) {
  try {
    const token = getToken(authHeader.split("Bearer ")[1]);

    const decoded = getUser(token);
    if(!decoded){
      res.status(500).json({ message: "Failed to Cancel booking" });
    }


    // Find the booking by ID and delete it
    const deletedBooking = await Booking.findOneAndDelete({ email: Email });
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({
        message: "Booking deleted successfully",
        booking: deletedBooking,
      });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Failed to Cancel booking" });
  }
}

module.exports = {
  handleCreateBookingById,
  handleDeleteBookingById,
};
