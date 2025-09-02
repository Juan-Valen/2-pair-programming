// feedbackHandlers.js
/**
const Feedback = require("./FeedbackLib");

const getAllFeedbacks = (req, res) => {
  res.json(Feedback.getAll());
};

const createFeedback = (req, res) => {
  const { sender, message, rating } = req.body;
  // Ensure all fields are provided
  if (!sender || !message || !rating) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const newFeedback = Feedback.addOne(sender, message, rating);
  res.status(201).json(newFeedback);
};

const getFeedbackById = (req, res) => {
  const { feedbackId } = req.params; // feedbackId is a string
  const feedback = Feedback.findById(feedbackId);
  if (feedback) {
    res.json(feedback);
  } else {
    res.status(404).json({ error: "Feedback not found." });
  }
};

const updateFeedback = (req, res) => {
  const { feedbackId } = req.params;
  const updatedData = req.body;
  const updatedFeedback = Feedback.updateOne(feedbackId, updatedData);
  if (updatedFeedback) {
    res.json(updatedFeedback);
  } else {
    res.status(404).json({ error: "Feedback not found." });
  }
};

const deleteFeedback = (req, res) => {
  const { feedbackId } = req.params;
  const wasDeleted = Feedback.deleteOne(feedbackId);
  if (wasDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Feedback not found." });
  }
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
 */