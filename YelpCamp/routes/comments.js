var express = require("express");
var router = express.Router({ mergeParams: true }); // input obj makes parameters (:id) available
var Campground = require("../models/campground"),
    Comment = require("../models/comment");
var middleware = require("../middleware");

// NEW Comment Route
// NOTE isLoggedIn middleware checks if user is logged in
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(err, newComment) {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }
                else {
                    // Associate logged in user with new comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();

                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                }
                req.flash("success", "Succsessfully added comment");
                res.redirect("/campgrounds/" + foundCampground._id);
            });
        }
    });
});

// EDIT comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("comments/edit", {
                campground_id: req.params.id,
                comment: foundComment
            });
        }
    });
});

// UPDATE comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            req.flash("errror", "Something went wrong");
            console.log(err);
        } else {
            req.flash("success", "Comment deleted");
        }
        res.redirect("/campgrounds/" + req.params.id);
    });
});

module.exports = router;