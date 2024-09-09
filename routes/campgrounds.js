const express = require("express");
const router = express.Router({ mergeParams: false });
const Campground = require("../models/campground");
const { validated, isLoggedIn } = require("../middleware");
const { validationResult } = require("express-validator");

router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});
router.get("/", async (req, res) => {
  let camps = await Campground.find({});
  res.render("campgrounds/home", { camps });
});
router.post("/", validated, isLoggedIn, async (req, res) => {
  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ error: result.array() });
  }
  let camp = new Campground(req.body);
  try {
    camp.author = req.user;
    let saved = await camp.save();
    req.flash("success", "successfully created new camp");
    res.redirect(`/campgrounds/${camp._id}`);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground });
});
router.put("/:id", validated, isLoggedIn, async (req, res) => {
  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ error: result.array() });
  }
  let { id } = req.params;
  let campground = await Campground.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.redirect(`/campgrounds/${id}`);
});
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id)
    .populate("author")
    .populate("review");
  res.render("campgrounds/show", { campground });
});
router.delete("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect(`/campgrounds/`);
});

module.exports = router;
