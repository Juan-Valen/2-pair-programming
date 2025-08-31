let feedbackStorage = [
  {
    id: 1,
    sender: "John Smith",
    message: "Great session on React components! I found the examples very helpful.",
    rating: 5,
  },
  {
    id: 2,
    sender: "Jane Doe",
    message: "The session on React components was very insightful!",
    rating: 4,
  },
];

let nextId = feedbackStorage.length > 0 ? Math.max(...feedbackStorage.map(f => f.id)) + 1 : 1;

const getAll = () => {
  return feedbackStorage;
};

const addOne = (sender, message, rating) => {
  if (!sender || !message || !rating) {
    throw new Error("Invalid feedback data");
  }
  const newFeedback = {
    id: nextId++,
    sender,
    message,
    rating,
  };
  feedbackStorage.push(newFeedback);
  return newFeedback;
};

const findById = (id) => {
  return feedbackStorage.find((feedback) => feedback.id === parseInt(id, 10));
};

const updateOne = (id, updatedData) => {
  const feedbackIndex = feedbackStorage.findIndex((feedback) => feedback.id === parseInt(id, 10));
  if (feedbackIndex === -1) {
    return null; // Feedback not found
  }
  feedbackStorage[feedbackIndex] = {
    ...feedbackStorage[feedbackIndex],
    ...updatedData,
    id: parseInt(id, 10), // Ensure ID remains unchanged
  };
  return feedbackStorage[feedbackIndex];
};

const deleteOne = (id) => {
  const initialLength = feedbackStorage.length;
  feedbackStorage = feedbackStorage.filter((feedback) => feedback.id !== parseInt(id, 10));
  return feedbackStorage.length < initialLength; // Return true if an item was deleted
};

module.exports = {
  getAll,
  addOne,
  findById,
  updateOne,
  deleteOne,
};

if (require.main === module) {
    console.log("--- Testing feedbackLib.js ---");

    // Test addOne
    console.log("Adding new feedback:");
    const newFeedback = addOne("Alice", "Very helpful content.", 5);
    console.log(newFeedback); // Expected: new feedback object

    // Test getAll
    console.log("\nGetting all feedback:");
    console.log(getAll()); // Expected: list including the new feedback

    // Test findById
    console.log("\nFinding feedback by ID 1:");
    const foundFeedback = findById(1);
    console.log(foundFeedback); // Expected: Feedback with ID 1

    // Test updateOne
    console.log("\nUpdating feedback with ID 1:");
    const updatedFeedback = updateOne(1, { message: "The session on React components was very insightful!" });
    console.log(updatedFeedback); // Expected: Feedback with ID 1 and updated message

    // Test deleteOne
    console.log("\nDeleting feedback with ID 2:");
    const isDeleted = deleteOne(2);
    console.log(`Deletion successful: ${isDeleted}`); // Expected: true

    // Verify deletion
    console.log("\nVerifying deletion of ID 2:");
    console.log(findById(2)); // Expected: undefined or null

    console.log("--- Testing Complete ---");
}
