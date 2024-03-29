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

// @desc Get single review
// @route GET /api/v1/reviews/:id
// @access Public

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: review });
});

// @desc Add review
// @route POST /api/v1/bootcamp/:bootcampId/reviews
// @access Private

exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new Error(`No bootcamp with the id ${req.params.bootcampId}`, 404)
    );
  }

  const review = await Review.create(req.body);

  res.status(200).json({ success: true, data: review });
});

// @desc Update review
// @route PUT /api/v1/reviews/:id
// @access Private

exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new Error(`No review with the id of ${req.params.id}`, 404));
  }

  // Make user review belong to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new Error(`Not authorized to update review `, 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: review });
});

// @desc Delete review
// @route DELETE /api/v1/reviews/:id
// @access Private

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new Error(`No review with the id of ${req.params.id}`, 404));
  }

  // Make user review belong to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new Error(`Not authorized to update review `, 401));
  }
  console.log(review);

  await review.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
