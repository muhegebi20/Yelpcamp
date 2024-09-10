const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult, matchedData } = require("express-validator");

module.exports.renderRegisterForm = (req, res) => {
  res.render("user/register");
};
module.exports.registerUser = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    let { errors } = result;
    req.flash("error", `${errors[0].msg}`);
    return res.redirect("/register");
    // return res.send({ error: result.array() });
  }
  const data = matchedData(req);
  data.password = bcrypt.hashSync(data.password, 10);
  let user = new User(data);
  await user.save();
  req.logIn(user, (err) => {
    if (err) return next(err);
    req.flash("success", "Welcome");
    res.redirect("/campgrounds");
  });
};

module.exports.renderLoginForm = (req, res) => {
  res.render("user/login");
};
module.exports.loginUser = (req, res) => {
  req.flash("success", "welcome back!");
  // req.session.user = req.user;
  res.redirect("/campgrounds");
};
module.exports.logoutUser = async (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.redirect("/campgrounds");
  });
};
