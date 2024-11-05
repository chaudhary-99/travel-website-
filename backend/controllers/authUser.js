const User = require("../models/user");
const {getUser, setUser} = require("../services/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

async function sendVerificationEmail(Email) {
  try {
    // Generate verification token
    const token = jwt.sign({ Email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smpt.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: "Email Verification for travelWebsite",
      text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/handleVerifyEmail?token=${token}`,
    };

    await transporter.sendMail(mailOptions);

    console.log("Verification email sent.");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}

async function handleVerifyEmail(req, res) {
  try {
    const { token } = req.query;
    // console.log(req);
    if (!token) {
      return res
        .status(400)
        .json({
          message: "from handleVerifyEmail Verification token is required.",
        });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.Email) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token." });
    }

    // Update user's email verification status in the database atomically
    const updatedUser = await User.findOneAndUpdate(
      { email: decoded.Email },
      { $set: { isVerified: true } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "email verified succesfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function handleUserSignup(req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName) {
      return res.status(400).json({ message: "First name is required" });
    } else if (!lastName) {
      return res.status(400).json({ message: "Last name is required" });
    } else if (!email) {
      return res.status(400).json({ message: "Email is required" });
    } else if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      isVerified: false,
    });
    await newUser.save();

    // Send verification email
    await sendVerificationEmail(email);

    const token = setUser(newUser);

    // Set the token in the Authorization header
    res.setHeader('Authorization', `Bearer ${token}`);

    res.status(201).json({
      message: "User signed up successfully. Verification email sent.",
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function handleUserSignin(req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    // Compare hashed passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = setUser(user);

    // Set the token in the Authorization header
    res.setHeader('Authorization', `Bearer ${token}`);

    return res.status(200).json({ message: "Sign in successful" });
  } catch (error) {
    console.error('Error during sign-in:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


async function giveUserForToken(req,res){
  const userUId = req.headers["authorization"];

  if (!userUId) {
    return res.json({message: "No Token"});
    // Temporary returning message now user should render to login page
  }
  
  const token = userUId.split("Bearer ")[1];

  const user = getUser(token);

  res.json(user);
}

async function GiveTokens(req,res){
  const token = jwt.sign(
    {
      Username: req.body.Username,
      Email: req.body.Email,
    },
    process.env.JWT_SECRET,
  );
  const newUser = new User({
    name: req.body.Username,
    email: req.body.Email,
    password: req.body.Password,
    isVerified: false,
  });
  await newUser.save();
  return res.json({token});
}
module.exports = {
  sendVerificationEmail,
  handleVerifyEmail,
  handleUserSignup,
  handleUserSignin,
  GiveTokens,
  giveUserForToken
};
