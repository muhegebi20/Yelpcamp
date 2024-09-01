const express = require("express");
const router = express.Router({ mergeParams: false });
const Campground = require("../models/campground");
const { validated } = require("../middleware");
const { validationResult } = require("express-validator");

router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});
router.get("/", async (req, res) => {
  let camps = await Campground.find({});
  res.render("campgrounds/home", { camps });
});
router.post("/", validated, async (req, res) => {
  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ error: result.array() });
  }
  let camp = new Campground(req.body);
  try {
    let saved = await camp.save();
    res.redirect(`/campgrounds/${camp._id}`);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground });
});
router.put("/:id", validated, async (req, res) => {
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
  let campground = await Campground.findById(id);
  res.render("campgrounds/show", { campground });
});
router.delete("/:id", async (req, res) => {
  let { id } = req;
  await Campground.findOneAndDelete(id);
  res.redirect(`/campgrounds/`);
});

module.exports = router;
