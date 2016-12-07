var express = require('express');
var passport = require('passport');

var User = require('../models/user');
var Verify = require('./verify');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  User.register(new User({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while registering user!', err);
      return next(err);
    }

    console.log('user registered!');

    res.json({ message: 'Registered' });
  });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            var token = Verify.getToken({
                "username": user.username,
                "_id": user._id,
                "admin": user.admin
            });
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

module.exports = router;
