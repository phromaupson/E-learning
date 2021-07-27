var mongo = require('mongodb');
var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost:27017/ElearningDB';

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var classSchema = mongoose.Schema({
    class_id: {
        type: String
    },
    class_name: {
        type: String
    },
    description: {
        type: String
    },
    instructor: {
        type: String
    }
});
var Classes = module.exports = mongoose.model('classes', classSchema)

module.exports.getClasses = function(callback, limit) {
    Classes.find(callback).limit(limit)
}

module.exports.saveNewClass = function(newClass, callback) {
    newClass.save(callback);
}