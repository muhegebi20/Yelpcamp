const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const campground = require("./routes/campgrounds");
const userroute = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Yelp-tekrar");
}

//routes
app.use("/campgrounds/", campground);
app.use("/", userroute);

app.listen(3000, () => {
  console.log("listening to the server...");
});
