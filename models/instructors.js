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

var instructorSchema = mongoose.Schema({
    username: {
        type: String
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String
    }
});
var Instructor = module.exports = mongoose.model('instructors', instructorSchema)

//ชื่อของอาจารย์คนนั้นๆมาแสดง
module.exports.getInstructorsByUserName = function(username, callback) {
    var query = {
        username: username
    }
    Instructor.findOne(query, callback);
}