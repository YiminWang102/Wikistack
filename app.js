const express = require('express');
const app = express();
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');

var router = require('./routes');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const chalk = require('chalk');

const models = require('./models');

var blue = function (text) {
	console.log(chalk.blue(text));
};


app.use(volleyball);

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


models.db.sync({})
.then(function() {
  app.listen(1738, function(){
    blue('listening on port 1738');
  });
})
.catch(console.error);

// var server = app.listen(1738, function(){
//   console.log('listening on port 1738');
// })

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', router);
