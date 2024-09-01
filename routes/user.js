const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/login", (req, res) => {
  res.render("user/login");
});
router.post("/login", (req, res) => {
  let { body } = req;
  res.send(body);
});
router.get("/register", (req, res) => {
  res.render("user/register");
});
router.post("/register", (req, res) => {
  let { body } = req;
  res.send(body);
});

module.exports = router;
