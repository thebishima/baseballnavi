var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('account.sqlite3');

/* GET home page. */
router.get('/', function (req, res, next) {
  db.serialize(() => {
    db.all("select * from account",(err, rows) => {
      if(!err) {
        var data = {
          content: rows
        };
        res.render('forBeginners/index', data);
      }
    });
  });
});

router.get('/loginHome', function (req, res, next) {
  res.render('forBeginners/loginHome', { title: 'Express' });
});




const { check, validationResult } = require('express-validator');

router.get('/login', function (req, res, next) {
  var data = {

  }
  res.render('forBeginners/login', data);
});

router.post('/login', (req, res, next) => {
  const nm = req.body.name;
  const pw = req.body.password;
  db.serialize(() => {
    db.run('insert into account (name, password, team) values (?, ?, ?)',
    nm, pw, te);
  });
  res.redirect('/forBeginners/account');
});



// サインアップ
router.get('/signup', (req, res, next) => {
  var data = {
    // form: {name:'アカウント名を入力', password:'パスワードを入力', team:'好きな球団を入力'},
  }
  res.render('forBeginners/signup', data);
});

router.post('/signup', (req, res, next) => {
  const nm = req.body.name;
  const pw = req.body.password;
  const te = req.body.team;
  db.serialize(() => {
    db.run('insert into account (name, password, team) values (?, ?, ?)',
    nm, pw, te);
  });
  res.redirect('/forBeginners/account');
});






router.get('/account', function (req, res, next) {
  res.render('forBeginners/account', { title: 'Express' });
});

module.exports = router;
