import Datastore from 'nedb';
import electron from 'electron';

const DATA_PATH = electron.remote.app.getPath('userData');

const db = new Datastore({filename: DATA_PATH + '/security.db'});
db.loadDatabase(function (err) {
    if (err) {
        // alert(err.toString());
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
    update: function (id, data, callback) {
        db.update({ _id: id }, data, {}, function (err, numAffected, affectedDocuments, upsert) {
            if (numAffected !== 1) {
                alert('删除失败');
            } else {
                callback && callback(numAffected);
            }
        })
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
    remove: function (id, callback) {
        db.remove({_id: id}, {}, function (err, numRemoved) {
            if (numRemoved !== 1) {
                alert('删除失败');
            } else {
                callback && callback(numRemoved);
            }
        });
    }
}