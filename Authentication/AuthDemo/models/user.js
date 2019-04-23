var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Adds methods from passport to user schema -- enables authentication
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);