var express = require('express');
var bodyParser = require('body-parser');
var	sharejs = require('share').server;
var shareDocs = require('./shareDocs.js');

var server = express();

server.use(express.static(__dirname + '/public'));
// TODO: this line is causing an exception
// server.use(bodyParser.json());
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

server.post('/docs', function(req, res) {
	var docName = req.body.docName;
	model.create(docName, 'text', function(error, doc) {
		res.send(doc);
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