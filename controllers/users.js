const User = require("../models/user");

module.exports.registerForm = (req, res) => {
    res.render("users/register");
};

module.exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to YelpCamp!");
            res.redirect("/campgrounds");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("register");
    }
};

module.exports.loginForm = (req, res) => {
    res.render("users/login");
};

module.exports.loginUser = (req, res) => {
    req.flash("success", "Welcome back!");
    const  redirectURL = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectURL);
};

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged out!");
    res.redirect("/campgrounds");
};