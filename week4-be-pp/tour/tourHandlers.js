// tourHandlers.js
const Tour = require("./tourLib");

const getAllTours = (req, res) => {
  const allTours = Tour.getAll();
  res.status(200).json(allTours);
};

const createTour = (req, res) => {
  const { name, info, image, price } = req.body;
  if (!name || !info || !image || !price) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const newTour = Tour.addOne(name, info, image, price);
  res.status(201).json(newTour);
};

const getTourById = (req, res) => {
  const tourId = req.params.tourId;
  const tour = Tour.findById(tourId);
  if (tour) {
    res.status(200).json(tour);
  } else {
    res.status(404).json({ message: `Tour with ID ${tourId} not found.` });
  }
};

const updateTour = (req, res) => {
  const tourId = req.params.tourId;
  const { name, info, image, price } = req.body;
  const updatedTour = Tour.updateById(tourId, name, info, image, price);
  if (updatedTour) {
    res.status(200).json(updatedTour);
  } else {
    res.status(404).json({ message: `Tour with ID ${tourId} not found.` });
  }
};

const deleteTour = (req, res) => {
  const tourId = req.params.tourId;
  const deletedTour = Tour.removeById(tourId);
  if (deletedTour) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: `Tour with ID ${tourId} not found.` });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};