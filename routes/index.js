const express = require('express');
const router = express.Router();

const wikiRouter = require('./wiki');
const userRouter = require('./user');

module.exports = router;

router.get('/', function (req, res, next){
  res.render('index');
});

router.use('/wiki', wikiRouter);

router.use('/users', userRouter);
