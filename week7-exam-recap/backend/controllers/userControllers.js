const User = require("../models/userModel");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  res.send("getAllUsers");
};

const createUser = async (req, res) => {
  res.send("createUser");
};

module.exports = {
  getAllUsers,
  createUser,
};
