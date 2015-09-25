'use strict';

var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000 );

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

app.listen(app.get('port'),function () {
	console.log('Express server listening on %d', app.get('port'));
});

module.exports = app;