'use strict';

var app = require('../app.js');
var should = require('should');
var supertest = require('supertest')(app);
var sinon = require('sinon');
var fs = require('fs');
var nock = require('nock');

describe('/userAddress',function () {
	it('should resturn success',function (done) {

		   nock('http://ip.taobao.com')
      .get('/service/getIpInfo.php')
      .query(true)
      .reply(200, {"code":0,"data":{"country":"\u4e2d\u56fd","country_id":"CN","area":"\u534e\u5317","area_id":"100000","region":"\u5317\u4eac\u5e02","region_id":"110000","city":"\u5317\u4eac\u5e02","city_id":"110100","county":"","county_id":"-1","isp":"\u4e2d\u56fd\u79d1\u6280\u7f51","isp_id":"1000114","ip":"210.75.225.254"}});

      supertest.get('/userAddress')
      	.expect('Content-Type', /json/)
      	.expect(200)
      	.end(function (err,res) {
      		if (err) return done(err);
      		res.body.city.should.be.ok();
      		res.body.country_id.should.be.equal('CN');
      		nock.restore();
      		done();
      	});
	})
});