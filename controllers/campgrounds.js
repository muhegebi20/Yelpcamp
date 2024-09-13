const Campground = require("../models/campground");
const { validationResult } = require("express-validator");

module.exports.index = async (req, res) => {
  let camps = await Campground.find({});
  res.render("campgrounds/home", { camps });
};
module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};
module.exports.createCampground = async (req, res) => {
  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ error: result.array() });
  }
  let camp = new Campground(req.body);
  try {
    camp.author = req.user;
    const imageDetails = req.files.map((file) => {
      return {
        url: file.path, // The uploaded image URL in Cloudinary
        filename: file.filename, // The name of the file in Cloudinary
      };
    });
    camp.images = imageDetails;
    let saved = await camp.save();
    req.flash("success", "successfully created new camp");
    res.redirect(`/campgrounds/${saved._id}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports.showCampground = async (req, res) => {
  let { id } = req.params;

  let campground = await Campground.findById(id)
    .populate({
      path: "review",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.render("campgrounds/show", { campground });
};
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground });
};
module.exports.updateCampground = async (req, res) => {
  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ error: result.array() });
  }
  let { id } = req.params;
  let campground = await Campground.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.redirect(`/campgrounds/${campground.id}`);
};
module.exports.deleteCampground = async (req, res) => {
  let { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect(`/campgrounds/`);
};
