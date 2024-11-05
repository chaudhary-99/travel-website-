const Contact = require('../models/contact');

// @desc Create a new contact entry
// @route POST /api/contact
exports.createContact = async (req, res) => {
    const { name, email, subject, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully." });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
