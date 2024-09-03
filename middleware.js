const { checkSchema } = require("express-validator");
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
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.locals.currentUser = req.user;
  }
  next();
};
