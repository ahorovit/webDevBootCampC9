var express = require("express");
var router = express.Router({mergeParams: true}); // input obj makes parameters (:id) available
var Campground = require("../models/campground"),
    Comment = require("../models/comment");
    
// NEW Comment Route
// NOTE isLoggedIn middleware checks if user is logged in
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", { campground: foundCampground });
        }
    });
});

// CREATE comment Route
// Middleware protects from request from unauthenticated user
router.post("/", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(err, newComment){
                if (err) {
                    console.log(err);
                } else {
                    // Associate logged in user with new comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                }
                res.redirect("/campgrounds/" + foundCampground._id);                
            });
        }
    });
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;