const express = require('express');
const router = express.Router();

const wikiRouter = require('./wiki');
const userRouter = require('./user');

const models = require('../models');

var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function (req, res, next){
  Page.findAll({})
  .then( pages => {
    res.render('index', {
      pages: pages
    })
  });
});

router.use('/wiki', wikiRouter);

router.use('/users', userRouter);
