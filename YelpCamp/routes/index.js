var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Landing Page (root)
router.get("/", function(req, res) {
    res.render("landing");
});

// show register form
router.get("/register", function(req, res) {
   res.render("register"); 
});

// Register new user
router.post("/register", function(req, res) {
    var newUser = {username: req.body.username};
    User.register(new User(newUser), req.body.password, function(err, createdUser) {
        if(err) {
            console.log(err);
            return res.render("register"); // return short-circuits further functions
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login", function(req, res) {
   res.render("login"); 
});

// Validate login (use passport.authenticate middleware)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
    // callback not actually needed
});

// log out route
router.get("/logout", function(req, res) {
   req.logout(); // comes from packages we have installed
   req.flash("success", "Successfully logged out");
   res.redirect("/campgrounds");
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;