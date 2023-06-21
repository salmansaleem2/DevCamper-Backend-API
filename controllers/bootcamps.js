const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamps");
const asyncHandler = require("../middlewear/async");
const geocoder = require("../utils/geocoder");

// @desc   Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find(); // this bootcamp is model
  res.status(200).json({ success: true, data: bootcamps });

  // res.status(400).json({ success: false });
  // next(err);

  // res
  //   .status(200)
  //   .json({ success: true, msg: "Show all bootcamps", hello: `${req.hello}` });
});

// @desc   Get Single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  // try {
  // const bootcamp = bootcamp.find();
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
  // } catch (err) {
  // res.status(400).json({ success: false });
  // next(err);
  // next(
  //   new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
  // );
});
// res.status(200).json({
//   success: true,
//   msg: `show bootcamps ${req.params.id}`,
// });
// res.status(400).json({ success: false });

// @desc Create new bootcamp
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req?.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
    message: "Create new bootcamps",
  });
  // res.status(400).json({
  //   success: false,
  //   message: error,
  // });

  // console.log(req?.body);
  // res.status(200).json({ success: true, msg: "Create new bootcamps" });
});

// @desc Update new bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.UpdateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(
    req?.params?.id,
    req?.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });

  // res
  //   .status(200)
  //   .json({ success: true, msg: `Update bootcamps ${req.params.id}` });
});

// @desc Delete  bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.DeleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req?.params?.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });

  // res
  //   .status(200)
  //   .json({ success: true, msg: `Delete bootcamps ${req.params.id}` });
});

// @desc GET bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radian
  // Divide distance by radius of Earth
  // Earth radius = 3,963 mi / 6378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
