// create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/user');
var Post = require('../models/post');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

// create comment
router.post('/create', function(req, res){
    var token = req.headers['authorization'];
    var decoded = jwt.decode(token);
    var comment = new Comment({
        content: req.body.content,