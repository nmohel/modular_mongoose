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

// The root route -- we want to get all of the users from the database and then render the index view passing it all of the users
app.get('/', function(req, res) {
    Snake.find({}, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {'all_snakes': data});
        }
    });
});

app.get('/snakes/new', function(req, res) {
    res.render('create');
});

app.get('/snakes/edit/:id', function(req, res) {
    console.log(req.params);
    Snake.findById(req.params.id, function(err, data) {
        if (err) {
            console.log(err);
            res.redirect('/')
        } else {
            res.render('edit', {snake: data});
        }
    });
})

app.get('/snakes/:id', function(req, res) {
    console.log(req.params);
    console.log(req.params.id)
    Snake.findById(req.params.id, function(err, data) {
        if (err) {
            console.log(err);
            res.redirect('/')
        } else {
            res.render('read', {snake: data});
        }
    });
});

app.post('/snakes', function(req, res) {
    console.log("BODY", req.body);
    var snek = new Snake(req.body);
    snek.save(function(err) {
        if (err) {
            console.log(err);
            res.redirect('/snakes/new');
        } else {
            console.log('Added snek succesfully');
            res.redirect('/');
        }
    });
});

app.post('/snakes/destroy/:id', function(req, res) {
    console.log(req.params.id);
    Snake.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully deleted')
        }
        res.redirect('/')
    });
})

app.post('/snakes/:id', function(req, res) {
    console.log(req.params.id);
    Snake.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, data) {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            var url = '/snakes/' + data._id;
            res.redirect(url);
        }
        
    })
})


// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
