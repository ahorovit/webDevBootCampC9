var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX route - shows all campgrounds
router.get("/", function(req, res) {
    // Get all campgrounds
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            // NOTE: if user is logged in, session will track req.user object
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

// NEW route - shows form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// CREATE route - creates new campground
router.post('/', middleware.isLoggedIn, function(req, res) {
    // get data from form and add to campgorunds array
    Campground.create({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        creator: {
            id: req.user._id,
            username: req.user.username
        }
    }, function(err, newCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW route -- shows details of one campground
// NOTE: because this comes after NEW route, "new" will not be treated as an id
router.get("/:id", function(req, res) {
    // find campground with provided ID --> populate associated comments
    Campground.findById(req.params.id).populate("comments").exec(function(err, found) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", { campground: found });
        }
    });
});

// EDIT Campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/camgrounds");
        }
        else {
            res.render("campgrounds/edit", { campground: foundCampground });
        }
    });
});

// UPDATE Campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect("/campgrounds");
    });
});

module.exports = router;