const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const Campground = require("../models/campground");
const campgrounds = require("../controllers/campgrounds");
const { storage } = require("../cloudinary");
const multer  = require('multer');
const upload = multer({ storage });

router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.newForm);

router.route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editForm));

// starter code used to test creating one single campground
// router.get("/makecampground", async (req, res) => {
//     const camp = new Campground({ title: "My Backyard", description: "Cheap camping!" });
//     await camp.save();
//     res.send(camp);
// });

module.exports = router;