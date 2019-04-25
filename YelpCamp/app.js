var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

// Requiring Routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/yelp_camp_v5', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Clear Campgrounds and generate seed data
// seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "MEAN Stack is Awesome!",
    resave: false,
    saveUninitialized: false
}));

// Setup auth strategy and sessions
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass logged in user to every template (middleware)
app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   next();
});

// ROUTES
app.use("/", indexRoutes);  // Passing base route prepends to all routes in router file
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// App must listen on Port
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server Has Started!");
});
