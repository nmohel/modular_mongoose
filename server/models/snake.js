var mongoose = require('mongoose');

var SnakeSchema = new mongoose.Schema({
    species: {type: String, required: true},
    color: String,
    pic_url: String
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

mongoose.model('Snake', SnakeSchema);