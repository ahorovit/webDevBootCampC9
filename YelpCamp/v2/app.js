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
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


// Campground.create({
//         name: "Walnut Brook",
//         image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-nationalpark.jpg"
    
//     }, function(err, campground) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log(campground);
//         }
// });



// var campgrounds = [
//     { name: "Salmon Creek", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-blm.jpg" },
//     { name: "Walnut Brook", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-nationalpark.jpg" },
//     { name: "Bullshit Peak", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-commercial.jpg" },
//     { name: "Salmon Creek", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-blm.jpg" },
//     { name: "Walnut Brook", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-nationalpark.jpg" },
//     { name: "Bullshit Peak", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-commercial.jpg" }
// ];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    // Get all campgrounds
    Campground.find({}, function(err,allCampgrounds){
       if (err) {
           console.log(err);
       } else {
            res.render("campgrounds", { campgrounds: allCampgrounds });
       }
    });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post('/campgrounds', function(req, res) {
    // get data from form and add to campgorunds array
    Campground.create({ 
        name: req.body.name, 
        image: req.body.image 
    }, function(err, newCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server Has Started!");
});
