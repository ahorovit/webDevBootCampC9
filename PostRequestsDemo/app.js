var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));  // Needed for parsing urlencoded POST bodies
app.use(express.static("public")); // Serves up public directory for js and css resources
app.set("view engine", "ejs"); // Allows dropping .ejs extension from route render targets

var friends = [
    'Tony',
    'Miranda',
    'Shelving',
    'Newt'
];

app.get("/", function(req, res){
   res.render("home");
});

app.get("/friends", function(req, res){
   res.render("friends", {friends: friends}); 
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;          // body-parser package is needed to load request body
    friends.push(newFriend);
    res.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS LISTENING");
});