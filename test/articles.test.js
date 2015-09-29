'use strict';

var app = require('../app.js');
var should = require('should');
var request = require('supertest')(app);
var sinon = require('sinon');
var fs = require('fs');

describe('/articleList', function() {

	it('should return article list',function (done) {
		var spydir = sinon.spy(fs, "readdirSync");
		var spyfile = sinon.spy(fs,"readFileSync")
		request.get('/articleList')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err,res) {
				if (err) return done(err);
				spydir.calledOnce.should.be.true();
				spyfile.callCount.should.be.above(1);
				res.body.should.be.Array();
				fs.readdirSync.restore();
				fs.readFileSync.restore();
				done();
			});
	});

	it('should return article list length three',function (done) {
		var mockData = {'id':'10003','title':'中国人加油','content':'油加满了有点晃.'};
		var stubdir = sinon.stub(fs, "readdirSync");
		stubdir.returns(['10003.json','10004.json','10005.json']);
		var stubfile = sinon.stub(fs,"readFileSync");
		stubfile.returns(JSON.stringify(mockData));
		request.get('/articleList')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err,res) {
				if (err) return done(err);
				stubdir.calledOnce.should.be.true();
				stubfile.callCount.should.be.equal(3);
				res.body.should.be.Array();
				res.body.length.should.be.equal(3);
				stubdir.restore();
				stubfile.restore();
				done();
			});
	});

});