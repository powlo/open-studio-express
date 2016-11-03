var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Artwork = require('../models/artworks');

var router = express.Router();
router.use(bodyParser.json());

//gets all artworks. Could be unwieldy
router.route('/')
.get(function (req, res, next) {
    Artwork.find({}, function (err, art) {
        if(err) return next(err);
        res.json(art);
    });
})

//post a new artwork
.post(function (req, res, next) {
    Artwork.create(req.body, function (err, obj) {
        if(err) return next(err);
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the artwork with id: ' + obj._id);
    });
})

.delete(function (req, res, next) {
    Artwork.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

router.route('/:id')
.get(function (req, res, next) {
    Artwork.findById(req.params.id, function (err, obj) {
        if (err) throw err;
        res.json(obj);
    });
})

.put(function (req, res, next) {
    Artwork.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, obj) {
        if (err) throw err;
        res.json(obj);
    });
})

.delete(function (req, res, next) {
    Artwork.findByIdAndRemove(req.params.id, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = router;