const express = require("express");
const router = express.Router();
const { isValid } = require("../middleware");
const passport = require("passport");
const CatchAsync = require("../utils/CatchAsync");
const users = require("../controllers/users");

router
  .route("/login")
  .get(users.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.loginUser
  );
router
  .route("/register")
  .get(users.renderRegisterForm)
  .post(isValid, CatchAsync(users.registerUser));

router.get("/logout", CatchAsync(users.logoutUser));

module.exports = router;
