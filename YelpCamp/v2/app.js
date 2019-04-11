var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


// Campground.create({
//     name: "Perdition",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDm5cqPwyHwMUgyb5ATLZYnae6jr_yM2IbPcW6NO-s_3BQmeec",
//     description: "Screeches. Beautiful Scenery. Foreboding"
// }, function(err, newCampground) {
//     if(err) 
//      console.log(err);
//      else
//      console.log(newCampground);
// });



app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX route - shows all campgrounds
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds
    Campground.find({}, function(err,allCampgrounds){
       if (err) {
           console.log(err);
       } else {
            res.render("index", { campgrounds: allCampgrounds });
       }
    });
});

// NEW route - shows form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
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
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW route -- shows details of one campground
// NOTE: because this comes after NEW route, "new" will not be treated as an id
app.get("/campgrounds/:id", function(req, res) {
    // find campground with provided ID
    Campground.findById(req.params.id, function(err, found){
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: found});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server Has Started!");
});
