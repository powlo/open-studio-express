// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    outline: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Artist', artistSchema);