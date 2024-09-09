const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { isValid } = require("../middleware");
const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("user/login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "welcome back!");
    req.session.user = req.user;
    res.redirect("/campgrounds");
  }
);
router.get("/register", (req, res) => {
  res.render("user/register");
});
router.post("/register", isValid, async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ error: result.array() });
  }
  const data = matchedData(req);
  data.password = bcrypt.hashSync(data.password, 10);
  let user = new User(data);
  await user.save();
  req.logIn(user, (err) => {
    if (err) return next(err);
    res.redirect("/campgrounds");
  });
});

router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.redirect("/campgrounds");
  });
});

module.exports = router;
