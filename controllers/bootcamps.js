const Bootcamp = require("../models/Bootcamps");

// @desc   Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: "Show all bootcamps", hello: `${req.hello}` });
};

// @desc   Get Single bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `show bootcamps ${req.params.id}`,
  });
};

// @desc Create new bootcamp
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
      message: "Create new bootcamps",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }

  // console.log(req?.body);
  // res.status(200).json({ success: true, msg: "Create new bootcamps" });
};

// @desc Update new bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.UpdateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamps ${req.params.id}` });
};

// @desc Delete  bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.DeleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamps ${req.params.id}` });
};
