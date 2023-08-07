// create web server
// create a route (url) to accept incoming requests
// create a route handler to accept incoming requests
// read the data from the request
// read the data from the file
// write the data to the file
// send a response back to the client
// start the server and listen for incoming requests

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    const comments = JSON.parse(data);
    const newComment = {
      id: Date.now(),// create a route (url) to accept incoming requests
// create a route handler to accept incoming requests
// read the data from the request
// read the data from the file
// write the data to the file
// send a response back to the client
// start the server and listen for incoming requests

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    const comments = JSON.parse(data);
    const newComment = {
      id: Date.now(),}