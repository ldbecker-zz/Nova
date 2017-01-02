var express = require('express');
var router = express.Router();
const models = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nova Challenge' });
});

router.post('/phase1', function(req, res, next) {
  console.log(models.File);
  models.File.create({
    description: req.body.description,
    tags: req.body.tags,
    filename: req.body.filename,
    filetype: req.body.filetype,
    status: 'pending'
  }).then(function(resp) {
    console.log(resp);
    res.status(200).send(resp);
  }).catch(function(err) {
    console.log(err);
    res.status(500).send(err);
  });
});

module.exports = router;
