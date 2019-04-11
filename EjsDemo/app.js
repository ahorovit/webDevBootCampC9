var express = require("express");
var app = express();

app.use(express.static("public")); // Serves up public directory for js and css resources
app.set("view engine", "ejs"); // Allows dropping .ejs extension from route render targets

app.get('/', function(req, res){
    res.render("home");
});

app.get('/fallinlovewith/:thing', function(req, res){
    var thing = req.params.thing;
    res.render("fallinlovewith", {thing: thing});
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS LISTENING");
});