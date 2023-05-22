var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {  //ここにpeppeteerを記述するかも
    var today = new Date();
    var a = today.getMonth() + 1;
    var b = today.getDate();

    var data = {
        month: a,
        day: b,
    };

    res.render('baseball/index', data);
});

router.get('/nittei', function (req, res, next) {
    var today = new Date();
    var y = today.getFullYear();
    var data = {
        year: y,
    };
    res.render('baseball/nittei', data);
});

router.get('/juni', function (req, res, next) {
    res.render('baseball/juni', { title: 'Express' });
});

router.get('/seiseki', function (req, res, next) {
    res.render('baseball/seiseki', { title: 'Express' });
});

module.exports = router;