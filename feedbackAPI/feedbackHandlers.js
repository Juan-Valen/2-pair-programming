const Feedback = require("./feedbackLib");

const getAllFeedbacks = (req, res) => {
    const feedbacks = Feedback.getAll()
    res.json(feedbacks)
};

const createFeedback = (req, res) => {
    const {sender, message, rating} =req.body
    const newFeedback = Feedback.addOne (sender, message , rating)
    if (newFeedback){
        res.status(201).json(newFeedback)
       
    }else{
        res.status(500).json({message:"failed to create feedback"})
    }
    
};

const getFeedbackById = (req, res) => {
    const feedbackID = req.params.feedbackId
    const feedback = Feedback.findByID(feedbackID)
    if (feedback){
        res.json(feedback)
    }else{
        res.status(404).json({message: "Feedback not found"})
    }
};

const updateFeedback = (req, res) => {
    const feedbackId = req.params.feedbackId
    const {sender ,message, rating } = req.body
    const updatedFeedback = Feedback.updateOneByID(feedbackId,{sender , message , rating})
    if (updatedFeedback){
        res.json(updatedFeedback)
    }else{
        res.status(404).json({message: "Feedback not found"})
    }
};

const deleteFeedback = (req, res) => {
    const feedbackId = req.params.feedbackId
    const isDeleted = Feedback.deleteOneByID(feedbackId)
    if (isDeleted) {
        res.status(204).json({message: "feedback deleted successfully"})
    }else{
        res.status(404).json({message: "Feedback not found"})
    }
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};