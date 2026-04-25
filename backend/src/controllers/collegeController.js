import College from "../models/College.js";


// @desc   Add new college
// @route  POST /api/colleges
export const addCollege = async (req, res) => {
  try {
    const { name, fees, location, rating, courses, image } = req.body;

    const college = await College.create({
      name,
      fees,
      location,
      rating,
      courses,
      image,
    });

    res.status(201).json({
      success: true,
      message: "College added successfully",
      data: college,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// @desc   Get all colleges
// @route  GET /api/colleges
export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: colleges.length,
      data: colleges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// @desc   Filter colleges
// @route  GET /api/colleges/filter
export const filterColleges = async (req, res) => {
  try {
    const { location, minRating, maxFees } = req.query;

    let query = {};

    if (location) {
      query.location = new RegExp(location, "i");
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    if (maxFees) {
      query.fees = { $lte: Number(maxFees) };
    }

    const colleges = await College.find(query);

    res.status(200).json({
      success: true,
      count: colleges.length,
      data: colleges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "College updated successfully",
      data: college,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "College deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};