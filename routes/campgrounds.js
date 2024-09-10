const express = require("express");
const router = express.Router({ mergeParams: false });
const Campground = require("../models/campground");
const { validated, isLoggedIn, isAuthor } = require("../middleware");
const { validationResult } = require("express-validator");
const CatchAsync = require("../utils/CatchAsync");
const campgrounds = require("../controllers/campgrounds");

router.get("/new", isLoggedIn, campgrounds.renderNewForm);
router
  .route("/")
  .get(CatchAsync(campgrounds.index))
  .post(validated, isLoggedIn, CatchAsync(campgrounds.createCampground));
router.get("/:id/edit", isLoggedIn, CatchAsync(campgrounds.renderEditForm));
router
  .route("/:id")
  .put(
    validated,
    isLoggedIn,
    isAuthor,
    CatchAsync(campgrounds.updateCampground)
  )
  .get(CatchAsync(campgrounds.showCampground))
  .delete(isLoggedIn, isAuthor, CatchAsync(campgrounds.deleteCampground));

module.exports = router;
