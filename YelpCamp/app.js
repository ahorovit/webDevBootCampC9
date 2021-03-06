var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

// Requiring Routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

// MongoDB Atlas: 'mongodb+srv://adin:8pvUJno6T6AgShB3@cluster0-srpbs.mongodb.net/yelp_camp_prod?retryWrites=true'
// localhost: 'mongodb://localhost:27017/yelp_camp_v6'

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

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
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
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
