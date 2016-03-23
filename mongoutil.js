var mongoutil = {

    mongoInsert: function(db, collection_name, data, cb) {
        var collection = db.collection(collection_name);
        collection.insert(data, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted into the ' + collection_name + ' collection');
                cb(res);
            }
        });
    },

    mongoRead: function(db,collection_name, data, cb) {
        var collection = db.collection(collection_name).find(data);
        collection.each(function(err, doc) {
            if (err) {
                console.log(err);
            }
            else if( doc != null){
                console.dir(doc);
                cb(doc);
            }            
        })

    },

    mongoDelete: function(db, collection_name, data, cb) {
        var collection = db.collection(collection_name);
        collection.deleteMany(data, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log('Deleted the collection' + collection_name);
                cb(res);
            }
        });
    },

    mongoUpdate: function(db, collection_name, search, set, cb) {
        var collection = db.collection(collection_name);
        var $set = {
            $set: set
        };
        collection.updateMany(search, $set, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log('Updated the collection' + collection_name);
                cb(res);
            }
        });
    }
}
module.exports = mongoutil;