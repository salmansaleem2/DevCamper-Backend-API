const express = require("express");
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  UpdateBootcamp,
  DeleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamps");
const advancedResults = require("../middlewear/advancedResults");

// Include other resource routers
const courseRouter = require("./courses");
const { protect, authorize } = require("../middlewear/auth");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

// router.get("/", (req, res) => {
//   // for text/html
//   // res.send("<h1>Hello from express</h1>");
//   // for JSON data
//   // res.send({ name: "Hello from express" });
//   res.status(200).json({ success: true, msg: "Show all bootcamps" });
// });

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), UpdateBootcamp)
  .delete(protect, authorize("publisher", "admin"), DeleteBootcamp);

module.exports = router;

// todCdcqJmcPjDV0P

// brad
// MONGODB@4
// mongodbdbdb
