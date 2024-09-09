const express = require("express");
const router = express.Router();
const Review = require("../models/reviews");
const Campground = require("../models/campground");

router.post("/campgrounds/:id/reviews/", async (req, res) => {
  const { id } = req.params;
  let camp = await Campground.findById(id);
  // console.log(id);
  // console.log(req.body);
  // res.send(req.body);
  let review = new Review(req.body);
  camp.review.push(review);
  review.user = req.user;
  await camp.save();
  await review.save();
  res.redirect(`/campgrounds/${id}`);
});
router.delete("/campgrounds/:id/reviews/:revId", async (req, res) => {
  let { id, revId } = req.params;
  await Review.findOneAndDelete({ _id: revId });
  res.redirect(`/campgrounds/${id}`);
});

module.exports = router;
