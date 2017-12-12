var snakes = require('../controllers/snakes.js');

//exporting a function that takes our 'app' and does all the routing.
module.exports = function(app) {
    app.get('/', function(req, res) {
        snakes.showAll(req, res);
    });

    app.get('/snakes/new', function(req, res) {
        res.render('create');
    });

    app.get('/snakes/edit/:id', function(req, res) {
        snakes.showEdit(req, res);
    })

    app.get('/snakes/:id', function(req, res) {
        snakes.showOne(req, res);
    });

    app.post('/snakes', function(req, res) {
        snakes.create(req, res);
    });

    app.post('/snakes/destroy/:id', function(req, res) {
        snakes.delete(req, res);
    });

    app.post('/snakes/:id', function(req, res) {
        snakes.update(req, res);       
    });
}