const Campground = require("../models/campground");
const Review = require("../models/reviews");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  let camp = await Campground.findById(id);
  let review = new Review(req.body);
  camp.review.push(review);
  review.author = req.user;
  await camp.save();
  await review.save();
  req.flash("success", "Thank you for reviewing us!");
  res.redirect(`/campgrounds/${id}`);
};
module.exports.deleteReview = async (req, res) => {
  let { id, revId } = req.params;
  await Review.findOneAndDelete({ _id: revId });
  res.redirect(`/campgrounds/${id}`);
};
