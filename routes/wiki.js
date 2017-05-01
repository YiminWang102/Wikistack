const express = require('express');
const router = express.Router();
const models = require('../models');

var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', (req, res, next) => {
  res.redirect('/');
  //res.send('got to GET /wiki/');
});

router.post('/', (req, res, next) => {

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(userArr => {
    var user = userArr[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    return page.save().then( page => {
      return page.setAuthor(user);
    });
  })
  .then( page => {
    res.redirect(page.route);
  })
  .catch(next);
});

router.get('/add', (req, res, next) => {
  res.render('addpage');
});

router.get('/:urlTitle', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
      {model: User, as: 'author'}
    ]
  })
  .then(function(page){
    if(page === null) {
      res.status(404).send();
    } else{
      res.render( 'wikipage',
      {
        page: page
      });
    }
  })
  .catch(next);
});
