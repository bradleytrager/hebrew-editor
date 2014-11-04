var db = require('mongoskin').db('mongodb://localhost:27017/sharejs');

module.exports.findAllDocs = function(callback) {
	db.collection('docs').find({}, {
		"_id": true
	}).toArray(function(err, result) {
		if (err) throw err;
		callback(result);
		db.close();
	});
};