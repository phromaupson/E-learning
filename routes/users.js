var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Student = require('../models/students');
var Instructor = require('../models/instructors');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const {
    check,
    validationResult
} = require('express-validator');

/* GET users listing. */
router.get('/register', function(req, res, next) {
    res.render('users/register')
});

router.get('/login', function(req, res, next) {
    res.render('users/login')
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: true
}), function(req, res) {
    res.redirect('/');
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function(username, password, done) {
    User.getUserByUserName(username, function(err, user) {
        //เปรียบเทียบชื่อ
        if (err) throw error
        if (!user) {
            //ไม่พบผู้ใช้ในระบบ
            return done(null, false)
        } else {
            //หาเจอ
            return done(null, user)
        }
        //เปรียบเทียบรหัสผ่าน
        User.comparePassword(password, user.password, function(err, isMatch) {
            if (err) throw error
            if (isMatch) {
                //รหัสผ่านตรง
                return done(null, user)
            } else {
                //รหัสผ่านไม่ตรง
                return done(null, false)
            }
        });
    });
}));

router.post('/register', [
    check('username', 'กรุณาป้อน Username').not().isEmpty(),
    check('password', 'กรุณาป้อนรหัสผ่าน').not().isEmpty(),
    check('email', 'กรุณาป้อนอีเมล').isEmail(),
    check('fname', 'กรุณาป้อนชื่อของท่าน').not().isEmpty(),
    check('lname', 'กรุณาป้อนนามสกุลของท่าน').not().isEmpty(),
], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    //มีข้อผิดพลาดส่ง error กลับ
    if (!result.isEmpty()) {
        res.render('users/register', {
            errors: errors
        })
    } else {
        //ดึงเรียกข้อมูลจากฟอร์ม
        var username = req.body.username;
        var type = req.body.type;
        var password = req.body.password;
        var email = req.body.email;
        var fname = req.body.fname;
        var lname = req.body.lname;
        //แสดงผล
        // console.log(username);
        // console.log(type);
        // console.log(password);
        // console.log(email);
        // console.log(fname);
        // console.log(lname);

        //เก็บข้อมูลลงไปใน newUser ก่อน
        var newUser = new User({
            username: username,
            email: email,
            password: password,
            type: type
        });
        if (type == "student") {
            var newStudent = new Student({
                username: username,
                fname: fname,
                lname: lname,
                email: email
            });
            //บันทึกใน user models ของ student
            User.saveStudent(newUser, newStudent, function(err, newUser) {
                if (err) throw err
            });
        } else {
            var newInstructor = new Instructor({
                username: username,
                fname: fname,
                lname: lname,
                email: email
            });
            //บันทึกใน user models ของ Instructor
            User.saveInstructor(newUser, newInstructor, function(err, newUser) {
                if (err) throw err
            });
        }
        res.redirect('/');
    }
});
module.exports = router;