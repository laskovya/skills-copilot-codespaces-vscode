// create web server
// get comments from db
// send comments to client

// import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// create express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/commentDB', { useNewUrlParser: true, useUnifiedTopology: true });

// create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// create model
const Comment = mongoose.model('Comment', commentSchema);

// set view engine
app.set('view engine', 'ejs');

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// set static folder
app.use(express.static('public'));

// get comments from db
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { comments: comments });
        }
    })
});

// post comments to db
app.post('/', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// listen on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});