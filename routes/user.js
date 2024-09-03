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
    successRedirect: "/campgrounds",
  })
);
router.get("/register", (req, res) => {
  res.render("user/register");
});
router.post("/register", isValid, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ error: result.array() });
  }
  const data = matchedData(req);
  data.password = bcrypt.hashSync(data.password, 10);
  let user = new User(data);
  console.log(user);
  await user.save();
  res.redirect("/login");
});

module.exports = router;
