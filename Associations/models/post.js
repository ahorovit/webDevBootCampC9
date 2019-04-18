var mongoose = require("mongoose");

// POST -- title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// This exports the Post model to any file requiring this file
module.exports = mongoose.model("Post", postSchema);