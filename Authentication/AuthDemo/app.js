var express = require("express"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    mongoose = require("mongoose"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");


mongoose.connect('mongodb://localhost:27017/auth_demo', { useNewUrlParser: true });

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "This is an excellent encryption key",
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));

// Set up passport functionality
app.use(passport.initialize());
app.use(passport.session());

// User model has passport functionality included. 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));


/*    =====    ROUTES     ======     */

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// AUTH ROUTES

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    //register() hashes password and stores hash along with username
    User.register(new User({username: req.body.username}), req.body.password, function(err, newUser) {
        if (err) {
            console.log(err);
            return res.render("register"); // Short-circuit with return
        } else {
            passport.authenticate("local")(req, res, function() {  // Specifies "local" strategy
                res.redirect("/secret");
            });
        }
    });
});

// LOGIN ROUTES

// render login form
app.get("/login", function(req, res) {
    res.render("login");
});

// Use passport.authenticate() as middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {

});

app.get("/logout", function(req, res) {
    req.logout(); // Destroys user data stored in session
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();  // Next just passes control to next function in chain
    }
    
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server Started!");
});
