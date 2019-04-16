var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });


// POST -- title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);


// USER -- email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema] // postSchema must be declared first
});

var User = mongoose.model("User", userSchema);


var newUser = new User({
  email: "hermione@hogwarts.edu",
  name: "Hermione Granger"
});


// newUser.posts.push({
//     title: "How to brew Polyjuice Potion",
//     content: "Just Kidding"
// })

// newUser.save(function(err, user){
//   if (err) {
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });

// var newPost = new Post({
//   title: "Reflections on Apples",
//   content: "They are delicious"
// });

// newPost.save(function(err, post){
//   if (err) {
//       console.log(err);
//   } else {
//       console.log(post);
//   }
// });

User.findOne({ name: "Hermione Granger" }, function(err, user) {
    if (err) {
        console.log(err);
    }
    else {
        user.posts.push({
            title: "3 Things I hate",
            content: "Voldemort, Tom Riddle, Voldemort"
        });
        user.save(function(err, user) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(user);
            }
        });
    }
});