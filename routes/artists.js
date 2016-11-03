var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Artist = require('../models/artists');

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
.get(function (req, res, next) {
    Artist.find({}, function (err, artist) {
        if (err) throw err;
        res.json(artist);
    });
})

.post(function (req, res, next) {
    Artist.create(req.body, function (err, obj) {
        if(err) return next(err);
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the artist with id: ' + obj._id);
    });
})

.delete(function (req, res, next) {
    Artist.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

router.route('/:id')
.get(function (req, res, next) {
    Artist.findById(req.params.id, function (err, obj) {
        if (err) throw err;
        res.json(obj);
    });
})

.put(function (req, res, next) {
    Artist.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, obj) {
        if (err) throw err;
        res.json(obj);
    });
})

.delete(function (req, res, next) {
    Artist.findByIdAndRemove(req.params.id, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = router;