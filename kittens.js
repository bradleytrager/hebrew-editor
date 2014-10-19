var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	var kittySchema = mongoose.Schema({
		name: String
	});
	var Kitten = mongoose.model('Dog', kittySchema);
	var silence = new Kitten({
		name: 'Silence'
	})
	console.log(silence.name) // 'Silence'
	var fluffy = new Kitten({
		name: 'fluffy'
	});
	fluffy.save(function(err, fluffy) {
		if (err) return console.error(err);
		console.log(fluffy);
	});
});