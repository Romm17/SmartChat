var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var paths = require('./dict/paths.json');

var messages = ["Hello!", "I am Vova"];

var server = new http.Server(function(req, res) {
	console.log(req.method);
	if (req.url == '/init') {
		res.end(JSON.stringify(messages));
	}
	else if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;

            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () {
            var post = qs.parse(body);
            if (req.url == '/messages') {
            	messages.push(post['post']);
   				console.log(post['post']);
   				console.log(messages);
            }
        });
    }
	else if (paths[req.url]) {
		var file = new fs.ReadStream(paths[req.url]);
		if(paths[req.url].indexOf('html') != -1)
			res.setHeader("Content-Type", "text/html");
		file.pipe(res);
	}
	else {
		res.setStatus('404');
		res.end("Page not found");
	}
}).listen(1337, '192.168.1.130');