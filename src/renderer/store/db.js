import Datastore from 'nedb';

let db = new Datastore({filename: './security.db'});
db.loadDatabase(function (err) {
    if (err) {
        console.log(err);
        alert('数据出现问题，请联系开发者');
    }
});

export default {
    insert: function (data, callback) {
        db.insert(data, function (err, newData) {
            if (err) {
                console.log(err);
                alert('数据出现问题，请联系开发者');
            } else {
                callback && callback(newData);
            }
        });
    },
    update: function (id, data) {

    },
    findAll: function (callback) {
        db.find({}, function (err, list) {
            if (err) {
                console.log(err);
                alert('数据出现问题，请联系开发者');
            } else {
                callback && callback(list);
            }
        });
    },
    remove: function (id) {

    }
}