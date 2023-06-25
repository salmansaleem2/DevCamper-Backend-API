const express = require("express");
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  UpdateBootcamp,
  DeleteBootcamp,
  getBootcampsInRadius,
} = require("../controllers/bootcamps");

// Include other resource routers
const courseRouter = require("./courses");

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

router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(UpdateBootcamp)
  .delete(DeleteBootcamp);

module.exports = router;

// todCdcqJmcPjDV0P

// brad
// MONGODB@4
// mongodbdbdb
