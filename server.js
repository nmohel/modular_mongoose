// requirements (like imports)
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 

//this is my app
var app = express();

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/mongoose_dash');

var SnakeSchema = new mongoose.Schema({
    species: {type: String, required: true},
    color: String,
    pic_url: String
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});
mongoose.model('Snake', SnakeSchema);
var Snake = mongoose.model('Snake');

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

// store function from routes module.exports in a variable
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
