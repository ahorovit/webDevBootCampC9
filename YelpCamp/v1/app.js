var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-blm.jpg"},
    {name: "Walnut Brook", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-nationalpark.jpg"},
    {name: "Bullshit Peak", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-commercial.jpg"},
    {name: "Salmon Creek", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-blm.jpg"},
    {name: "Walnut Brook", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-nationalpark.jpg"},
    {name: "Bullshit Peak", image: "https://www.discovermoab.com/wp-content/uploads/2017/10/camping-commercial.jpg"}
];

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req, res){
   res.render("new");
});

app.post('/campgrounds', function(req, res){
    // get data from form and add to campgorunds array
    campgrounds.push({name: req.body.name, image: req.body.image});
    
    // redirect back to campgrounds page (get)
    res.redirect("/campgrounds");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server Has Started!");
});