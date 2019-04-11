var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

// No impact on Mongo --> informs JS of the desired structure (still flexible)
var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

// compiles catSchema into a model named "Cat"
var Cat = mongoose.model("Cat", catSchema);

// // Add new cat to DB
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "friendly"
// });

// // Pass callback in case of failure
// george.save(function(err, cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG");
//     } else {
//         console.log("SAVE SUCCESSFUL");
//         console.log(cat);
//     }
// });

Cat.create({
   name: "Binky",
   age: 15,
   temperament: "slutty"
}, function(err, cat){
    if (err) {
        console.log("Create failed");
    } else {
        console.log("Successful create");
        console.log(cat);
    }
});

//retrieve all cats from DB
Cat.find({}, function(err, cats){
    if (err) {
        console.log("READ FAILED");
    } else {
        console.log("ALL CATS:");
        console.log(cats);
    }
});