const Feedback = require("./feedbackLib");

/**
 * Handler for GET /feedback.
 * Retrieves all feedback entries.
 */
const getAllFeedbacks = (req, res) => {
  const allFeedbacks = Feedback.getAll();
  res.status(200).json(allFeedbacks);
};

/**
 * Handler for POST /feedback.
 * Creates a new feedback entry.
 */
const createFeedback = (req, res) => {
  const { sender, message, rating } = req.body;

  const newFeedback = Feedback.addOne(sender, message, rating);

  if (newFeedback) {
    res.status(201).json(newFeedback);
  } else {
    // Return a 400 Bad Request if any required data is missing.
    res.status(400).json({ message: "Sender, message, and rating are required." });
  }
};

/**
 * Handler for GET /feedback/:feedbackId.
 * Retrieves a single feedback entry by its ID.
 */
const getFeedbackById = (req, res) => {
  const id = parseInt(req.params.feedbackId, 10);
  const feedback = Feedback.findById(id);

  if (feedback) {
    res.status(200).json(feedback);
  } else {
    // Return a 404 Not Found if the feedback ID does not exist.
    res.status(404).json({ message: "Feedback not found" });
  }
};

/**
 * Handler for PUT /feedback/:feedbackId.
 * Updates an existing feedback entry by its ID.
 */
const updateFeedback = (req, res) => {
  const id = parseInt(req.params.feedbackId, 10);
  const updates = req.body;

  const updatedFeedback = Feedback.updateOne(id, updates);

  if (updatedFeedback) {
    res.status(200).json(updatedFeedback);
  } else {
    res.status(404).json({ message: "Feedback not found" });
  }
};

/**
 * Handler for DELETE /feedback/:feedbackId.
 * Deletes a feedback entry by its ID.
 */
const deleteFeedback = (req, res) => {
  const id = parseInt(req.params.feedbackId, 10);
  const deletedFeedback = Feedback.deleteOne(id);

  if (deletedFeedback) {
    // The pet-api example returns a success message, so we'll follow that pattern.
    res.status(200).json({ message: `Feedback with id ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: "Feedback not found" });
  }
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
