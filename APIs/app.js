var express = require('express');
var app = express();
var request = require('request');

app.use(express.static("public")); // Serves up public directory for js and css resources
app.set("view engine", "ejs"); // Allows dropping .ejs extension from route render targets

// app.get('/', function(req, res){
//     res.render("home");
// });

app.get('/results/:search', function(req, res) {
    request('http://omdbapi.com/?s=' +req.params.search+ '&apikey=thewdb', function(error, response, body){
        if (!error && response.statusCode == 200){
            var results = JSON.parse(body);
            res.render('results', {data: results});
        } 
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS LISTENING");
});



// &apikey=thewdb