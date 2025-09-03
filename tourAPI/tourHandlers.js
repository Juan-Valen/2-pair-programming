const Tour = require("./tourLib");

const notFound = { message: "Tour not found." };

const getAllTours = (req, res) => {
    const tours = Tour.getAll();
    res.json(tours);
};

const createTour = (req, res) => {
    const { name, info, image, price  } = req.body;
    const newTour = Tour.addOne( name, info, image, price );

    if (newTour) {
        res.status(201).json(newTour);
    } else {
        res.status(500).json({ message: "Failed to create tour." })
    }
};

const getTourById = (req, res) => {
    const tourId = req.params.tourId;
    const tour = Tour.findById(tourId);

    if (tour) {
        res.json(tour);
    } else {
        res.status(404).json(notFound);
    }
};

const updateTour = (req, res) => {
    const tourId = req.params.tourId;
    const details = req.body;

    const updatedTour = Tour.updateOneById(tourId, details);

    if (updatedTour) {
        res.json(updatedTour);
    } else {
        res.status(404).json(notFound);
    }
};

const deleteTour = (req, res) => {
    const tourId = req.params.tourId;
    const isDeleted = Tour.deleteOneById(tourId);

    if (isDeleted) {
        res.status(204).json({ message: "Tour deleted successfully." })
    } else {
        res.status(404).json(notFound)
    }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
