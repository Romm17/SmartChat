var http = require('http');
var fs = require('fs');
// var url = require('url');

var paths = require('./dict/paths.json');

var server = new http.Server(function(req, res) {
	if (paths[req.url]) {
		var file = new fs.ReadStream(paths[req.url]);
		file.pipe(res);
	}
	else {
		res.setStatus('404');
		res.end("Page not found");
	}
}).listen(1337, '127.0.0.1');