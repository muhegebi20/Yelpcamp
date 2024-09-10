const { checkSchema } = require("express-validator");
const Review = require("./models/reviews");
const Campground = require("./models/campground");
module.exports.validated = checkSchema({
  title: {
    notEmpty: {
      errorMessage: "Title can't be empty",
    },
    trim: true,
  },
  location: {
    notEmpty: {
      errorMessage: "Location can't be empty",
    },
    trim: true,
  },
  description: {
    notEmpty: {
      errorMessage: "description can't be empty",
    },
    trim: true,
  },
  price: {
    notEmpty: {
      errorMessage: "description can't be empty",
    },
    isInt: {
      options: { min: 0 }, // Correct use of 'options' for range validation
      errorMessage: "price must be greater than 0",
    },
  },
});
module.exports.isValid = checkSchema({
  username: {
    trim: true,
    notEmpty: {
      errorMessage: "username can't be empty",
    },
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: "Email can't be empty",
    },
    isEmail: {
      errorMessage: "please use valid email address",
    },
  },
  password: {
    trim: true,
    isString: true,
    notEmpty: {
      errorMessage: "Password can't be empty",
    },
    optional: {
      min: 8,
    },
  },
});

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you must login first");
    return res.redirect("/login");
  }
  console.log("authenticated...");
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, revId } = req.params;
  const review = await Review.findById(revId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};
