var express = require('express');
var router = express.Router();

const {
    check,
    validationResult
} = require('express-validator');

/* GET users listing. */
router.get('/register', function(req, res, next) {
    res.render('users/register')
});

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
        //ป้อนครบทุกส่วนบันทึกข้อมูล
    }
});
module.exports = router;