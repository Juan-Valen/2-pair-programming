const mongoose = require("mongoose");
const Tour = require("../models/tourModel");

// GET /tours
const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find({}).sort({ createdAt: -1 });
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve tours" })
    }
};

// POST /tours
const createTour = async (req, res) => {

    try {
        const newTour = await Tour.create({ ...req.body }); // Spread the req.body object

        if (newTour) {
            res.status(201).json(newTour); // 201 Created
        } else {
            // Handle error (e.g., failed to create tour)
            res.status(400).json({ message: "Invalid tour data" });
        }
    } catch (error) {
        res.status(400).json({ message: "Failed to create tour" })
        console.error(error.message);
    }
};

// GET /tours/:tourId
const getTourById = async (req, res) => {
    const { tourId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
        return res.status(400).json({ message: "invalid tour id" })
    }

    try {
        const tour = await Tour.findById(tourId);
        if (tour) {
            res.status(200).json(tour);
        } else {
            res.status(404).json({ message: "Tour not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve tour" })
        console.error(error.message);
    }
};

// PUT /tours/:tourId
const updateTour = async (req, res) => {
    const { tourId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
        return res.status(400).json({ message: "invalid tour id" })
    }

    try {
        const updatedTour = await Tour.findOneAndUpdate({ _id: tourId }, { ...req.body }, { new: true }); // Spread the req.body object
        if (updatedTour) {
            res.status(200).json(updatedTour);
        } else {
            // Handle update failure (e.g., tour not found)
            res.status(404).json({ message: "Tour not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update tour" })
        console.error(error.message);
    }
};

// DELETE /tours/:tourId
const deleteTour = async (req, res) => {
    const { tourId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
        return res.status(400).json({ message: "invalid tour id" })
    }

    try {
        const isDeleted = await Tour.findOneAndDelete({ _id: tourId });
        if (isDeleted) {
            res.status(204).send(); // 204 No Content
        } else {
            // Handle deletion failure (e.g., tour not found)
            res.status(404).json({ message: "Tour not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete tour" })
        console.error(error.message);
    }
};

module.exports = {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
};
