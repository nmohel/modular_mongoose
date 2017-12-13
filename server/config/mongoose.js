var mongoose = require('mongoose');
var fs = require('fs'); // so we can go through and get all model files
var path = require('path')

mongoose.connect('mongodb://localhost/mongoose_dash');

var models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(filename) {
    if (filename.endsWith('.js')) {
        require(path.join(models_path, './', filename))
    }
});