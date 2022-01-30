const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const expressError = require("../utilities/expressError");
const passport = require("passport");
const User = require("../models/user");
const users = require("../controllers/users");

router.route("/register")
    .get(users.registerForm)
    .post(catchAsync(users.createUser));

router.route("/login")
    .get(users.loginForm)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.loginUser);

router.get("/logout", users.logoutUser);

module.exports = router;