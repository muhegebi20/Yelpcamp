if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
console.log(process.env.SECRET_KEY);

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
const review = require("./routes/review");
const ExpressError = require("./utils/ExpressError");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
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

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
//routes
app.get("/", (req, res) => {
  res.redirect("/campgrounds");
});
app.use("/campgrounds/", campground);
app.use("/", userroute);
app.use("/campgrounds/:id/reviews/", review);

app.all("*", (req, res, next) => {
  next(new ExpressError(400, "Page not found!"));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Ohhh!, Something went wrong";
  res.status(status).render("error", { err });
});

app.listen(3000, () => {
  console.log("listening to the server...");
});
