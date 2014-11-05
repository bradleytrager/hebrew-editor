var express = require('express');
var	sharejs = require('share').server;
var shareDocs = require('./shareDocs.js');

var server = express();
server.use(express.static(__dirname + '/public'));

server.get('/docs', function(req, res) {
	shareDocs.findAllDocs(function(docs) {
		res.send(docs);
	});
});

server.delete('/docs/:id', function(req, res) {
	model.delete(req.params.id, function(data) {
		res.send(data);
	});
});

var options = require('./options'); // See docs for options. {type: 'redis'} to enable persistance.
var model = sharejs.createModel(options);
// Attach the sharejs REST and Socket.io interfaces to the server
sharejs.attach(server, options);

server.listen(8000, function() {
	console.log('Server running at http://127.0.0.1:8000/');
});