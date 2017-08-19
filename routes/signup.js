var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
//var db = mongojs('mongodb://bhavik:Bhavik09@ds149353.mlab.com:49353/mydemodb', ['users'], {authMechanism: 'ScramSHA1'});
  var db = mongojs('mongodb://127.0.0.1:27017/mydemodb', ['users']);
// var mongodb = require('mongodb');

// var uri = 'mongodb://bhavik:Bhavik09@ds149353.mlab.com:49353/mydemodb';
// var uri = 'mongodb://127.0.0.1:27017/mydemodb';
// mongodb.MongoClient.connect(uri, function(err, db) {
    
//     if(err){ throw err; }
//     var users = db.collection('users');
//   //  console.log(users);
// });

/* GET All Users */
router.get('/users', function(req, res, next) {
    db.users.find(function(err, users) {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
});
 
/* GET One User with the provided ID */
router.get('/user/:id', function(req, res, next) {
    db.users.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, users) {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
});
 
/* POST/SAVE a User */
router.post('/user', function(req, res, next) {
    var user = req.body;
    // var user = {username: "sid", active: "true", id: 2};
    if (user.username == '' || user.username == null || user.active == null || user.id == null) {
        res.status(400);
        res.json({
            // "json": user,
            "error": "Invalid Data"
        });
    } else {
        db.users.save(user, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});
 
/* PUT/UPDATE a User */
router.put('/user/:id', function(req, res, next) {
    var user = req.body;
    var updObj = {};
 
    if (user.active) {
        updObj.active = user.active;
    }
    if (user.username) {
        updObj.username = user.username;
    }
    if (user.id) {
        updObj.id = user.id;
    }
 
    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.users.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
 
 
});
 
/* DELETE a User */
router.delete('/user/:id', function(req, res) {
    db.users.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
 
});
 
module.exports = router;