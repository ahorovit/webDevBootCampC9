var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [{
        name: "Shit Creek",
        image: "https://www.brycecanyoncampgrounds.com/wp-content/uploads/2016/02/bryce-canyon-national-park-campground-1030x687.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    },
    {
        name: "Cripple Creek",
        image: "http://www.cityofwashburn.org/uploads/7/0/4/7/70473445/8666847.jpg?464",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Summer Camp",
        image: "https://www.yellowstonenationalparklodges.com/content/uploads/2017/04/madison-campground-445x290.jpg",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae"

    },
    {
        name: "Middle of Nowhere",
        image: "http://www.thetrustees.org/assets/images/places-to-visit/tully-lake-campground/tully-ad.jpg",
        description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
    },
];

function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed Campgrounds!");

        // Add a few campgrounds
        // NOTE: This is in the callback of deleteMany because order of functions executing is not guaranteed otherwise
        data.forEach(function(seedCG) {
            Campground.create(seedCG, function(err, newCampground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Created a Campground");
                    Comment.create({
                        text: "This place sucks",
                        author: "Homer"
                    }, function (err, newComment) {
                        if (err) {
                            console.log(err);
                        } else {
                            newCampground.comments.push(newComment);
                            newCampground.save();
                            console.log("Created New Comment");
                        }
                    });
                }
            });
        });

    });
}

module.exports = seedDB;