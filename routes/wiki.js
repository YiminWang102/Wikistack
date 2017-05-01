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

  page.save()
  .then(function(receivedPage){
    res.redirect(receivedPage.route);
  });
});

router.get('/add', (req, res, next) => {
  res.render('addpage');
});

router.get('/:urlTitle', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(page){
    res.render( 'wikipage',
    {
      title: page.title,
      content: page.content
    });
  })
  .catch(next);
});
