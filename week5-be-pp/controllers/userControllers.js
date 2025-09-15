const User = require("../models/userModel");
const mongoose = require("mongoose");

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retreive users" });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const newUser = await User.create({ ...req.body });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Failed to create users" });
  }
};

// GET /users/:userId
const getUserById = async (req, res) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.staus(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrive users" });
  }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.staus(400).json({ message: "Invalid user ID" });
  }
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { ...req.body },
      { new: true }
    ); // Spread the req.body object

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      // Handle update failure (e.g., user not found)
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update users" });
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.staus(400).json({ message: "Invalid user ID" });
  }
  try {
    const isDeleted = await User.findOneAndDelete({ _id: userId });

    if (isDeleted) {
      res.status(204).send();
    } else {
      // Handle deletion failure (e.g., user not found)
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete users" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
