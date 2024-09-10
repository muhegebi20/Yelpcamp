const express = require("express");
const router = express.Router({ mergeParams: true });
const CatchAsync = require("../utils/CatchAsync");
const { isReviewAuthor, isLoggedIn } = require("../middleware");
const reviews = require("../controllers/reviews");

router.post("/", CatchAsync(reviews.createReview));
router.delete(
  "/:revId",
  isLoggedIn,
  isReviewAuthor,
  CatchAsync(reviews.deleteReview)
);

module.exports = router;
