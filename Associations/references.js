var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo_2", { useNewUrlParser: true });

// module.export in these files provides the models used here
var Post = require("./models/post"),
    User = require("./models/user");


// // Find User
// // Find all posts for that user
// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });




// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });


Post.create({
    title: "How to create the best burger pt. 4",
    content: "gibberish"
}, function(err, post){
    if (err){
        console.log(err);
    } else {
        User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
          if(err) {
              console.log(err);
          } else {
              foundUser.posts.push(post);
              foundUser.save(function(err, data) {
                  if(err) {
                      console.log(err);
                  } else {
                      console.log(data);
                  }
              });
          }
        });
    }
});