const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const campground = require("./routes/campgrounds");
const userroute = require("./routes/user");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const { Strategy } = require("./utils/local-strategy");
const { isLoggedIn } = require("./middleware");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Yelp-tekrar");
}

// middlewares
app.use(
  session({
    secret: "demeo demo",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 216000,
    },
  })
);
app.use(flash());
app.use((req, res, next) => {
  console.log(req.session);
  res.locals.currentUser = req.user;
  console.log("user:" + req.user);
  res.locals.success = req.flash("success");
  next();
});
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(isLoggedIn);
app.use("/campgrounds/", campground);
app.use("/", userroute);

app.listen(3000, () => {
  console.log("listening to the server...");
});
