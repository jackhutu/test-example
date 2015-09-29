'use strict';

var app = require('../app.js');
var should = require('should');
var request = require('supertest')(app);

describe('/article/:id', function() {

	it('should return json data',function (done) {
		request.get('/article/10001')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err,res) {
				if (err) return done(err);
				res.body.title.should.be.ok();
				res.body.content.should.be.String();
				done();
			});
	});

	it('should when id not 10001 return 404',function (done) {
		request.get('/article/10002')
			.set('Accept', 'application/json')
			.expect(404)
			.end(function (err,res) {
				if (err) return done(err);
				done();
			});
	});
});

describe('/*', function() {

	it('should return html',function (done) {
		request.get('/testIndex')
			.expect('Content-Type', /html/)
			.expect(200)
			.end(function (err,res) {
				if (err) return done(err);
				done();
			});
	});

});
