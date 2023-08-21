const express = require("express");
// const Router = express.Router({ mergeParams: true });
const User = require("../models/User");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middlewear/advancedResults");
const { protect, authorize } = require("../middlewear/auth");

router.use(protect);
router.use(authorize("admin"));

router.route("/").get(advancedResults(User), getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
