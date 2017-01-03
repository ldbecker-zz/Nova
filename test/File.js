process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let Sequelize = require('sequelize');
//let Book = require('../app/models/book');
let models = require('../models');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('File', () => {
    beforeEach((done) => { //Before each test we empty the database
        models.File.destroy({where: {}}).then(function(err) {
          done();
        });
    });
/*
  * Test the /GET route
  */
  describe('GET /pending files', () => {
      it('it should GET all the pending files when none exist.', (done) => {
        chai.request(server)
            .get('/pending')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('GET /uploaded files', () => {
      it('it should GET all the uploaded files when none exist.', (done) => {
        chai.request(server)
            .get('/uploaded')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('POST /phase1', () => {
    it('it should respond with added file data and update file database when POSTed to /phase1', (done) => {
      chai.request(server)
        .post('/phase1')
        .send({description: 'test file', tags:'test, file', filetype:'.txt', status: 'pending'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.description.should.be.eql('test file');
          res.body.tags.should.be.eql('test, file');
          res.body.filetype.should.be.eql('.txt');
          res.body.status.should.be.eql('pending');

          chai.request(server)
            .get('/pending')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              res.body[0].description.should.be.eql('test file');
              done();
            });
        });
    });
  });

  describe('POST /phase1', () => {
    it('should reject requests with malformed data types, and not update the database', (done) => {
      chai.request(server)
        .post('/phase1')
        .send({description: 'this will fail', tags: ['badly', 'typed'], filetype: '.txt', status: 'pending'})
        .end((err, res) => {
          res.should.have.status(500);
          chai.request(server)
            .get('/pending')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
              done();
            });
        });
    });
  });

});