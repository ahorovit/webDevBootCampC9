var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Clear Campgrounds and generate seed data
seedDB();

app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX route - shows all campgrounds
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

// NEW route - shows form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// CREATE route - creates new campground
app.post('/campgrounds', function(req, res) {
    // get data from form and add to campgorunds array
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
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
app.get("/campgrounds/:id", function(req, res) {
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


// ========== Comments Routes =============

// NEW Comment Route
app.get("/campgrounds/:id/comments/new", function(req, res) {
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
app.post("/campgrounds/:id/comments", function(req, res) {
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
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                }
                res.redirect("/campgrounds/" + foundCampground._id);                
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server Has Started!");
});
