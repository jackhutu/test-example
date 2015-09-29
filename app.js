'use strict';

var express = require('express');
var fs = require('fs');
var superagent = require('superagent');
var app = express();

app.set('port', process.env.PORT || 3000 );
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/bower_components'));

//获取文章
app.get('/article/:id', function (req, res) {
	var aid = req.params.id;
	if(aid === '10001'){
		return res.status(200).json({
			title:"中国世界第一",
			content:"人均也是第一"
		});
	}else{
		return res.status(404).send();
	}
});

//获取文章列表
app.get('/articleList',function (req,res) {
	var articles = [];
	fs.readdirSync('./articles').forEach(function (file) {
		articles.push(JSON.parse(fs.readFileSync('./articles/' + file, 'utf8')));
	});
	return res.status(200).json(articles);
});

//获取用户地址
app.get('/userAddress',function (req,res) {
	var ip = ((/127\.0\.0\.1/).test(req.ip) || req.ip === '::1')?'210.75.225.254':req.ip;
	var url = "http://ip.taobao.com/service/getIpInfo.php?ip=" + ip;

	superagent.get(url)
	.set('Accept', 'application/json')
	.end(function (err,response) {
		var infos = JSON.parse(decodeURI(response.text));
		if(infos.code === 0){
			return res.status(200).json(infos.data);
		}else{
			return res.status(500).send();
		}
	});
});

app.get('/*',function (req,res) {
	return res.sendFile('index.html',{root:__dirname + '/client'});
});

app.listen(app.get('port'),function () {
	console.log('Express server listening on %d', app.get('port'));
});

module.exports = app;