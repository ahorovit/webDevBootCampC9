var express = require('express');
var app = express();



app.get('/', function(req, res){
    res.send('Hi There!');
});

app.get('/bye', function(req, res){
    res.send('Goodbye.');
});


app.get('/pattern/:name', function (req, res) {
    console.log(req.params);
    res.send("Hello "+req.params.name);
})


// app.get('/*', function(req, res){
//   res.send('SPLAT'); 
// });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('SERVER HAS STARTED');
});