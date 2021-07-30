var express = require('express');
var router = express.Router();
var Instructor = require('../models/instructors');

router.get('/classes', function(req, res, next) {
    Instructor.getInstructorsByUserName(req.user.username, function(err, instructor) {
        res.render('instructors/classes', { instructor: instructor });
    });
});

router.get('/classes/:id/lession/new', function(req, res, next) {
    res.render('instructors/newlession', { class_id: req.params.id })
});

module.exports = router;