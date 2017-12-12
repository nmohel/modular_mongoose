var mongoose = require('mongoose');
var Snake = mongoose.model('Snake');

module.exports = {
    showAll: function (req, res) {
        Snake.find({}, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.render('index', {'all_snakes': data});
            }
        });
    },
    showOne: function(req, res) {
        Snake.findById(req.params.id, function(err, data) {
            if (err) {
                console.log(err);
                res.redirect('/')
            } else {
                res.render('read', {snake: data});
            }
        });
    },
    showEdit: function(req, res) {
        Snake.findById(req.params.id, function(err, data) {
            if (err) {
                console.log(err);
                res.redirect('/')
            } else {
                res.render('edit', {snake: data});
            }
        });
    },
    create: function(req, res) {
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
    },
    update: function(req, res) {
        Snake.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, data) {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                var url = '/snakes/' + data._id;
                res.redirect(url);
            }
            
        });
    },
    delete: function(req, res) {
        Snake.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Successfully deleted')
            }
            res.redirect('/')
        });
    }
}