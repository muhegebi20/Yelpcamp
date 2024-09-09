const mongoose = require("mongoose");
const { Schema } = mongoose;

let reviewSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

let Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
