const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewear/async");
const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamps");

// @desc Get reviews
// @route GET /api/v1/reviews
// @route GET /api/v1/bootcamps/:bootcampId/reviews
// @access Public

exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } else {
    res.status(200).json(res.advancedResults);
    // query = Course.find().populate("bootcamp");
    // query = Course.find().populate({
    //   path: "bootcamp",
    //   select: "name description",
    // });
  }
  // const courses = await query;

  // res.status(200).json({ success: true, count: courses.length, data: courses });
});
