const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {
  const { usn, password } = req.body;

  if (!usn || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = await User.findOne({ usn });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({ usn, password });
  await user.save();

  res.status(201).json({ message: "Registration successful" });
});


// LOGIN
router.post("/login", async (req, res) => {
  const { usn, password } = req.body;

  const user = await User.findOne({ usn });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, usn: user.usn },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token
  });
});

module.exports = router;
