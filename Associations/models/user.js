var mongoose = require("mongoose");

// USER -- email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

// This exports the User model to any file requiring this file
module.exports = mongoose.model("User", userSchema);