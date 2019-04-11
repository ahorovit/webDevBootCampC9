var express = require("express");
var app = express();

app.get('/', function (req, res) {
    res.send("Hi there, welcome to my assignment");
});

app.get('/speak/:animal', function (req, res) {
    var db = {
        pig: 'oink',
        cow: 'moo',
        dog: 'bark',
    };
    
    var animal = req.params.animal;
    // console.log(animal);
    if (db[animal]){
            res.send("The "+animal+" says \""+db[animal]+"\"");
    } else {
        res.send('unknown animal: '+animal);
    }
});

app.get('/repeat/:statement/:times', function(req, res){
    var statement = req.params.statement;
    var times = Number(req.params.times);
    var str = ""
    for (var i = 0; i < times; i++){
        str += statement+' ';
    }
    
    res.send(str);
});

app.get('/*', function(req, res){
  res.send('Page Not Found'); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('SERVER HAS STARTED');
});