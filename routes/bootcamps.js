const express = require("express");
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  UpdateBootcamp,
  DeleteBootcamp,
} = require("../controllers/bootcamps");

// router.get("/", (req, res) => {
//   // for text/html
//   // res.send("<h1>Hello from express</h1>");
//   // for JSON data
//   // res.send({ name: "Hello from express" });
//   res.status(200).json({ success: true, msg: "Show all bootcamps" });
// });

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
