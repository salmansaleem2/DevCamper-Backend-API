const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "please add a description"],
  },
  weeks: {
    type: String,
    required: [true, "please add number of weeks"],
  },
  tuition: {
    type: String,
    required: [true, "please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  ScholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

// static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  console.log("Calculating avg cost....".blue);

  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: { _id: "$bootcamp", averageCost: { $avg: "$tuition" } },
    },
  ]);

  console.log(obj);
};

// call getAverage call after save
CourseSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

// call getAverage call before remove
CourseSchema.pre("remove", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model("Course", CourseSchema);
