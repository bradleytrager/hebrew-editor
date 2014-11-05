var express = require('express');
var sharejs = require('share').server;
var sharejsClient = require('share').client;
var shareDocs = require('./shareDocs.js');

var server = express();

server.use(express.static(__dirname + '/public'));

server.get('/docs', function(req, res) {
	shareDocs.findAllDocs(function(docs) {
		res.send(docs);
	});
});

server.get('/docs/:id', function(req, res) {
	model.getSnapshot(req.params.id, function(error, data) {
		res.send(data);
	});
});

server.delete('/docs/:id', function(req, res) {
	model.delete(req.params.id, function(data) {
		res.send(data);
	});
});

var options = require('./options'); 
var model = sharejs.createModel(options);
// Attach the sharejs REST and Socket.io interfaces to the server
sharejs.attach(server, options);
var port = 8001;
server.listen(port, function() {
	console.log('Server running at http://127.0.0.1:' + port + '/');
});