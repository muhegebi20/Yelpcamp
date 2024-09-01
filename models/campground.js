const mongoose = require("mongoose");
const { Schema } = mongoose;

const campgroundSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
  },
});

const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
