var mongoconn = {

	connect: function(err, success) {
		MongoClient = require('mongodb').MongoClient;
		var db_ret;
		MongoClient.connect("mongodb://localhost:27017/m101", function(err, db) {

			if (err) err();

			else success(db);

		});
	},

	close: function(db){
		db.close();

	}
}
module.exports = mongoconn;