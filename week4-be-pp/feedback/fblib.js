
let feedbacks = [];

/**
 * A counter for assigning new unique IDs to feedback entries.
 */
let nextId = 1;

/**
 * Retrieves all feedback entries from the data store.
 * @returns {Array<Object>} An array of all feedback objects.
 */
const getAll = () => {
  return feedbacks;
};

/**
 * Finds a specific feedback entry by its ID.
 * @param {number} id The unique ID of the feedback to find.
 * @returns {Object|null} The feedback object if found, otherwise null.
 */
const findById = (id) => {
  return feedbacks.find(feedback => feedback.id === id) || null;
};

/**
 * Adds a new feedback entry to the data store.
 * @param {string} sender The name of the person providing feedback.
 * @param {string} message The feedback message content.
 * @param {number} rating A rating from 1 to 5.
 * @returns {Object|boolean} The newly created feedback object, or false if data is missing.
 */
const addOne = (sender, message, rating) => {
  // Implement validation similar to petlib.js
  if (!sender || !message || !rating) {
    return false;
  }

  const newFeedback = {
    id: nextId++,
    sender,
    message,
    rating,
  };
  feedbacks.push(newFeedback);
  return newFeedback;
};

/**
 * Updates an existing feedback entry by its ID.
 * @param {number} id The ID of the feedback to update.
 * @param {Object} updates An object containing the properties to update.
 * @returns {Object|null} The updated feedback object if found, otherwise null.
 */
const updateOne = (id, updates) => {
  const feedbackIndex = feedbacks.findIndex(feedback => feedback.id === id);
  if (feedbackIndex === -1) {
    return null; // Feedback not found
  }
  feedbacks[feedbackIndex] = { ...feedbacks[feedbackIndex], ...updates };
  return feedbacks[feedbackIndex];
};

/**
 * Deletes a feedback entry by its ID.
 * @param {number} id The ID of the feedback to delete.
 * @returns {Object|null} The deleted feedback object if found, otherwise null.
 */
const deleteOne = (id) => {
  const feedbackIndex = feedbacks.findIndex(feedback => feedback.id === id);
  if (feedbackIndex === -1) {
    return null; // Feedback not found
  }
  const [deletedFeedback] = feedbacks.splice(feedbackIndex, 1);
  return deletedFeedback;
};

// This block allows the library functions to be tested independently.
if (require.main === module) {
  console.log("Running self-tests for feedbackLib.js");

  // Test getAll on an empty array
  console.log("getAll():", getAll());

  // Test addOne with valid data
  const newFeedback = addOne("John Smith", "Great session on React components!", 5);
  console.log("addOne (valid):", newFeedback);

  // Test addOne with missing data
  const invalidFeedback = addOne("Jane Doe", "Missing rating");
  console.log("addOne (invalid):", invalidFeedback); // Should be false

  console.log("getAll() after addOne:", getAll());

  // Test findById
  const found = findById(newFeedback.id);
  console.log(`findById(${newFeedback.id}):`, found);
  const notFound = findById(999);
  console.log("findById(999):", notFound);

  // Test updateOne
  const updated = updateOne(newFeedback.id, { rating: 4 });
  console.log(`updateOne(${newFeedback.id}):`, updated);
  console.log("getAll() after updateOne:", getAll());

  // Test deleteOne
  const deleted = deleteOne(newFeedback.id);
  console.log(`deleteOne(${newFeedback.id}):`, deleted);
  console.log("getAll() after deleteOne:", getAll());
}

module.exports = {
  getAll,
  findById,
  addOne,
  updateOne,
  deleteOne
};