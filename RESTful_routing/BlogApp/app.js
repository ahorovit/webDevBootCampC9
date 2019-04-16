var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer");

// APP CONFIG

// Connect to DB
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false); // Silence deprecation warning
// sets view file format (engine) -- no need to specify .ejs
app.set("view engine", "ejs");
// Allows serving custom style sheet
app.use(express.static("public"));
// Allows parsing forms
app.use(bodyParser.urlencoded({extended: true}));
// Sanitizer must come after bodyParser (not sure why)
app.use(expressSanitizer());
// Enable method override (allows using PUT from HTML form)
app.use(methodOverride("_method"));

// Create blog schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});
// Compile blogSchema into Blog model
var Blog = mongoose.model("Blog", blogSchema);

// Sample Blog
// Blog.create({
//     title: "My Blog",
//     image: "http://smarterware.org/wp-content/uploads/2016/09/blogging.jpg",
//     body: "My first blog post is dumb"
// });


// RESTful ROUTES

// LANDING PAGE
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", {blogs: blogs}); 
        }
    });
});

// NEW
app.get("/blogs/new", function(req, res) {
   res.render("new"); 
});

// CREATE
app.post("/blogs", function(req, res) {
    // Remove any script tags or other malicious code
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.create(req.body.blog, function(err, newBlog) {
       if (err) {
            res.render("new");
       } else {
            res.redirect("/blogs");
       }
    }); 
});

// SHOW
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
       if (err) {
           res.redir("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
    });
});

// EDIT
app.get("/blogs/:id/edit", function(req, res) {
        Blog.findById(req.params.id, function(err, foundBlog) {
       if (err) {
           res.redir("/blogs");
       } else {
           res.render("edit", {blog: foundBlog});
       }
    });
});

// UPDATE
app.put("/blogs/:id", function(req, res) {
    // Remove any script tags or other malicious code
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if (err) {
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs/"+req.params.id)
       }
    });

});

//DELETE
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
});

// Sets Node app listening on correct port
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog App Server Has Started!");
});