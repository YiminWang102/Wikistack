const express = require('express');
const router = express.Router();
const models = require('../models');
const Promise = require('bluebird');

var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll()
  .then( users => {
    res.render('userspage', {
      users: users
    });
  })
  .catch(next);
});

router.get('/:userId', (req, res, next) => {

  var userPromise = User.findById(req.params.userId);
  var pagesPromise = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .then( values => {
    var user = values[0];
    var pages = values[1];
    res.render('user', {
      user: user,
      pages: pages
    });
  })
  .catch(next);
  // Page.findAll({
  //   where: {
  //     authorId: req.params.id
  //   }
  // })
  // .then( pages => {
  //   res.render('index', {
  //     pages: pages
  //   });
  // })
  // .catch(next);
});
