// Create web server application
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var mongoose = require('mongoose');
var Comment = require('./models/comment.js');
var Movie = require('./models/movie.js');
var _ = require('underscore');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/imooc');

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('imooc started on port ' + port);

// Index page
app.get('/', function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }

    res.render('index', {
      title: 'imooc 首页',
      movies: movies
    });
  });
});

// Detail page
app.get('/movie/:id', function (req, res) {
  var id = req.params.id;

  Movie.findById(id, function (err, movie) {
    Comment
      .find({ movie: id })
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function (err, comments) {
        res.render('detail', {
          title: 'imooc ' + movie.title,
          movie: movie,
          comments: comments
        });
      });
  });
});

// Admin page
app.get('/admin/movie', function (req, res) {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      title: '',
      director: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: ''
    }
  });
});

