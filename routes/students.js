var express = require('express');
var router = express.Router();
var Student = require('../models/students');
var Classes = require('../models/classes');

router.get('/classes', function(req, res, next) {
    Student.getStudentsByUserName(req.user.username, function(err, student) {
        res.render('students/classes', { student: student });
    });
});



module.exports = router;