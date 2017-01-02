var express = require('express');
var router = express.Router();
const models = require('../models');
const multer = require('multer');
var upload = multer({dest: './public/files'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nova Challenge' });
});

router.post('/phase1', function(req, res, next) {
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

router.get('/pending', function(req, res, next) {
  models.File.findAll({
    where: {
      status: 'pending'
    }
  }).then(function(resp) {
    console.log(resp);
    res.status(200).send(resp);
  }).catch(function(err) {
    console.log(err);
    res.status(500).send(err);
  })
});

router.post('/uploadHandler', upload.single('file'), function(req, res) {
  const fileName = JSON.parse(req.body.opts).fileName;
  const filePath = req.file.path;

  res.status(200).send(filePath);
});

module.exports = router;
