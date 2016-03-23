var express = require('express'),
	assert = require('assert'),
	db = require('./mongoconn'),
	mongoutil = require('./mongoutil');

var err = function(err) {
	if (err)
		console.dir(err);
	else
		console.log("error");
}

var datainsert = function(db) {
	db.collection('hw1_1').find({}).toArray(function(err, docs) {
		if (err) {
			db.close();
			throw err;
		}

		if (docs.length < 1) {
			console.dir("No documents found. Did you forget to mongorestore?");
			mongoutil.mongoInsert(db, 'hw1_1', {
				"answer": "Hello from MongoDB"
			}, function(res) {
				console.log(res)
			})
		} else {
			console.dir(docs);
			db.close(db);
		}

	})

}

var dataupdate = function(db) {
	db.collection('hw1_1').find({}).toArray(function(err, docs) {
		if (err) {
			db.close();
			throw err;
		}
		if (docs.length < 1) {
			console.dir("No documents to update!");
		} else {
			mongoutil.mongoUpdate(db, 'hw1_1', {
				"answer": "Hello from MongoDB"
			}, {
				"answer": "Hello from Mongo-node"
			}, function(res) {
				console.dir(res);
				db.close(db);
			})

		}

	})

}

var dataread = function(db) {
		mongoutil.mongoRead(db, 'hw1_1', {
			"answer": "Hello from Mongo-node"
		}, function(res) {
			//console.dir(res);
			db.close();
		});
	}

	var datadelete = function(db) {
		db.collection('hw1_1').find({}).toArray(function(err, docs) {
			if (err) {
				db.close();
				throw err;
			}
			if (docs.length < 1) {
				console.dir("No documents to delete!");
			} else {
				mongoutil.mongoDelete(db, 'hw1_1', {
					"answer": "Hello from MongoDB"
				}, function(res) {
					console.dir(res);
					db.close(db);
				})

			}

		})

	}
var success = function(db) {
	console.log("Connection to db successfully!");

	/*Run any operation one at a time*/
	
	//datainsert(db);
	//datadelete(db);
	//dataupdate(db);
	dataread(db);
}

db.connect(err, success);

//console.log(require.main === express)