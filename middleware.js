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
