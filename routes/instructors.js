var express = require('express');
var router = express.Router();
var Instructor = require('../models/instructors');

router.get('/classes', function(req, res, next) {
    Instructor.getInstructorsByUserName(req.user.username, function(err, instructor) {
        res.render('instructors/classes', { instructor: instructor });
    });
});

module.exports = router;