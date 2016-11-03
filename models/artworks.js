var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artworkSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Artwork', artworkSchema);