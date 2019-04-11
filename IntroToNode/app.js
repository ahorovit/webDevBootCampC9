// var catMe = require("cat-me");
// var joke = require("knock-knock-jokes");

// console.log(catMe());
// console.log(joke());

var faker = require('faker');

for (var i = 0; i < 10; i++){
    console.log(faker.fake("{{commerce.productName}}: ${{commerce.price}}"));
}
