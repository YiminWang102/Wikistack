const express = require('express');
const app = express();
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');

var routes = require('./routes');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');


app.use(volleyball);

var env = nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');

app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

var server = app.listen(1738, function(){
  console.log('listening on port 1738');
})

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);
