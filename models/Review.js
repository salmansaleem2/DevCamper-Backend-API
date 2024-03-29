const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review"],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, "please add some text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "please add a rating between 1 and 10"],
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Prevent user from submitting more than one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  // console.log("Calculating avg cost....".blue);

  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: { _id: "$bootcamp", averageRating: { $avg: "$rating" } },
    },
  ]);

  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcamp, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }

  console.log(obj, "ok");
};

// call getAverage call after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.bootcamp);
});

// call getAverage call before remove
ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.bootcamp);
});

module.exports = mongoose.model("Review", ReviewSchema);
