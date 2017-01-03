var express = require('express');
var router = express.Router();
const models = require('../models');
const multer = require('multer');
var upload = multer({dest: './public/files'});
const axios = require('axios');
const request = require('superagent');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nova Challenge' });
});

router.get('/data/:id', function(req, res, next) {
  console.log(Number(req.params.id));
  models.FileMeta.findOne({
    where: {
      fileid: Number(req.params.id)
    }
  }).then(function(resp) {
    console.log(resp);
    res.status(200).send(resp);
  }).catch(function(err) {
    console.log(err);
    res.status(500).send(err);
  })
})

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

router.post('/phase2', function(req, res, next) {
  var linecount = function(filepath, callback) {
    var i;
    var count = 0;
    require('fs').createReadStream(filepath)
      .on('data', function(chunk) {
        for (i=0; i < chunk.length; ++i)
          if (chunk[i] == 10) count++;
      })
      .on('end', function() {
        callback(count);
      });
  }
  linecount(req.body.filepath, function(lc) {
    //res.status(200).send({lc: lc, size: req.body.size, fileid: req.body.fileid});
    models.FileMeta.create({
      linecount: lc,
      filesize: req.body.size,
      fileid: req.body.fileid
    }).then(function(resp) {
      console.log(resp);
      models.File.update(
        {status: 'uploaded'},
        {where: {
          id: req.body.fileid
        }
      }).then(function(resp2) {
        res.status(200).send(resp);
      });
    }).catch(function(err) {
      console.log(err);
      res.status(500).send(err);
    });
  });
  //res.status(200).send({yay:'yay!'});
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

router.get('/uploaded', function(req, res, next) {
  models.File.findAll({
    where: {
      status: 'uploaded'
    }
  }).then(function(resp) {
    res.status(200).send(resp);
  }).catch(function(err) {
    res.status(500).send(err);
  });
});

router.post('/uploadHandler', upload.single('file'), function(req, res) {
  const fileName = JSON.parse(req.body.opts).fileName;
  const filePath = req.file.path;
  const size = JSON.parse(req.body.opts).size;
  const fileid = JSON.parse(req.body.opts).fileid;

  request.post('http://localhost:3000/phase2')
      .set('Accept', 'application/json')
      .send({filename: fileName, filepath: filePath, size: size, fileid: fileid})
      .end(function(err, resp) {
        if(err) {console.error(err);}
        console.log(resp.body);
        res.status(200).send(resp.body);
        return resp;
      });
});

module.exports = router;
