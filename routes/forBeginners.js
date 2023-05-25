var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('account.sqlite3');

/* GET home page. */
router.get('/', function (req, res, next) {
  db.serialize(() => {
    db.all("select * from account", (err, rows) => {
      if (!err) {
        var data = {
          content: rows
        };
        res.render('forBeginners/index', data);
      }
    });
  });
});

router.get('/loginHome', function (req, res, next) {
  if (req.cookies.name != null) {
    res.redirect('/forBeginners/account');
  }
  var data = {
  }
  res.render('forBeginners/loginHome', data);
});


// ログインページ

const { check, validationResult } = require('express-validator');

router.get('/login', function (req, res, next) {
  if (req.cookies.name != null) {
    res.redirect('/forBeginners/account');
  }
  var data = {
  }
  res.render('forBeginners/login', data);
});


router.post('/login', (req, res, next) => {
  let nm = req.body.name;
  let pw = req.body.password;
  let msg;
  db.serialize(() => {
    db.get('select * from account where name = ? and password = ?', [nm, pw], (err, row) => {
      if (row != undefined) {
        res.cookie('name', row.name);
        res.cookie('password', row.password);
        res.cookie('team', row.team);
        res.redirect('/forBeginners/account');
        return;
      } else {
        res.redirect('/forBeginners/login');
      }
    });
  });
});


// サインアップ
router.get('/signup', (req, res, next) => {
  var data = {
  }
  res.render('forBeginners/signup', data);
});

router.post('/signup', (req, res, next) => {
  const nm = req.body.name;
  const pw = req.body.password;
  const te = req.body.team;
  db.serialize(() => {
    db.run('insert into account (name, password, team) values (?, ?, ?)', nm, pw, te);
  });
  db.get('select * from account where name = ? and password = ?', [nm, pw], (err, row) => {
    if (row != undefined) {
      res.cookie('name', row.name);
      res.cookie('password', row.password);
      res.cookie('team', row.team);
      res.redirect('/forBeginners/account');
      return;
    }
  });
});


// アカウント管理ページ
router.get('/account', function (req, res, next) {
  let namae = req.cookies.name;
  if (namae != null) {
    var data = {
      name: namae
    }
  } else {
    res.redirect('/forBeginners/loginHome');
  }
  res.render('forBeginners/account', data);
});


router.post("/deletecookie", function (req, res, next) {
  res.clearCookie("name"); //Cookie削除
  res.clearCookie("password"); //Cookie削除
  res.clearCookie("team"); //Cookie削除
  res.redirect('/forBeginners');
});


// 日程表ページ
router.get('/calender', function (req, res, next) {
  res.render('forBeginners/calender', { title: 'Express' });
});





router.get('/example', (req, res, next) => {
  let wholedate = ['3月31日(金)','オリックス','ベルーナドーム','18:00','4月1日(土)','オリックス','ベルーナドーム','14:00','4月2日(日)','オリックス','ベルーナドーム','14:00','4月4日(火)','楽天','楽天モバイル','16:00','4月5日(水)','楽天','楽天モバイル','13:00','4月6日(木)','楽天','楽天モバイル','13:00','4月8日(土)','ソフトバンク','宮崎','13:00','4月9日(日)','ソフトバンク','鹿児島','14:00','4月11日(火)','ロッテ','ベルーナドーム','18:00','4月12日(水)','ロッテ','ベルーナドーム','18:00','4月13日(木)','ロッテ','県営大宮','18:00','4月14日(金)','日本ハム','エスコンＦ','18:00','4月15日(土)','日本ハム','エスコンＦ','14:00','4月16日(日)','日本ハム','エスコンＦ','13:00','4月18日(火)','ソフトバンク','東京ドーム','18:00','4月19日(水)','ソフト バンク','ベルーナドーム','18:00','4月21日(金)','オリックス','京セラD大阪','18:00','4月22日(土)','オリックス','京セラD大 阪','14:00','4月23日(日)','オリックス','京セラD大阪','14:00','4月25日(火)','ロッテ','ZOZOマリン','18:00','4月26日(水)','ロッテ','ZOZOマリン','18:00','4月28日(金)','楽天','ベルーナドーム','18:00','4月29日(土)','楽天','ベルーナドーム','14:00','4月30日(日)','楽天','ベルーナドーム','14:00','5月2日(火)','日本ハム','ベルーナドーム','18:00','5月3日(水)','日本ハム','ベルーナドーム','14:00','5月4日(木)','日本ハム','ベルーナドーム','13:00','5月5日(金)','オリックス','京セラD大阪','18:00','5月6日(土)','オリックス','京セラD大阪','14:00','5月7日(日)','オリックス','京セラD大阪','13:00','5月9日(火)','ロッテ','ベルーナドーム','18:00','5月10日(水)','ロッテ','ベルーナドーム','18:00','5月11日(木)','ロッテ','ベルーナドーム','18:00','5月12日(金)','楽天','ベルーナドーム','18:00','5月13日(土)','楽天','ベルーナドーム','14:00','5月14日(日)','楽天','ベル ーナドーム','14:00','5月16日(火)','日本ハム','エスコンＦ','18:00','5月17日(水)','日本ハム','エスコンＦ','18:00','5月18日(木)','日本ハム','エスコンＦ','13:00','5月19日(金)','ソフトバンク','PayPayドーム','18:00','5月20日(土)','ソフトバンク','PayPayドーム','14:00','5月21日(日)','ソフトバンク','PayPayドーム','14:00','5月23日(火)','ロッテ','ZOZOマリン','18:00','5月24日(水)','ロッテ','ZOZOマリン','18:00','5月26日(金)','オリックス','ベルーナドーム','18:00','5月27日(土)','オリックス','ベルーナドーム','14:00','5月28日(日)','オリックス','ベルーナドーム','13:00','5月30日(火)','阪神','ベルーナドーム','18:00','5月31日(水)','阪神','ベルーナドーム','18:00','6月1日(木)','阪神','ベルーナドーム','18:00','6月2日(金)','DeNA','横浜','18:00','6月3日(土)','DeNA','横浜','14:00','6月4日(日)','DeNA','横浜','14:00','6月6日(火)','中日','県営大宮','18:00','6月7日(水)','中日','ベルーナドーム','18:00','6月8日(木)','中日','ベルーナドーム','18:00','6月9日(金)','ヤクルト','ベルーナドーム','18:00','6月10日(土)','ヤクルト','ベルーナドーム','14:00','6月11日(日)','ヤクルト','ベルーナドーム','13:00','6月13日(火)','巨人','東京ドーム','18:00','6月14日(水)','巨人','東京ドーム','18:00','6月15日(木)','巨人','東京ドーム','18:00','6月16日(金)','広島','マツダスタジアム','18:00','6月17日(土)','広島','マツダスタジアム','14:00','6月18日(日)','広島','マツダスタジアム','13:30','6月23日(金)','楽天','楽天モバイル','18:00','6月24日(土)','楽天','楽天モバイル','14:00','6月25日(日)','楽天','楽天モバイル','13:00','6月27日(火)','日本ハム','那覇','18:30','6月28日(水)','日本ハム','那覇','18:30','6月30日(金)','ソフトバンク','ベルーナドーム','18:00','7月1日(土)','ソフトバンク','ベルーナドーム','18:00','7月2日(日)','ソフトバンク','ベルーナドーム','13:00','7月4日(火)','ロッテ','ZOZOマリン','18:00','7月5日(水)','ロッテ','ZOZOマリン','18:00','7月6日(木)','ロッテ','東京ドーム','18:30','7月8日(土)','オリックス','ほっと神戸','17:00','7月9日(日)','オリックス','京セラD大阪','14:00','7月10日(月)','ソフトバンク','京セラD大阪','18:00','7月12日(水)','ソフトバンク','北九州','18:00','7月13日(木)','ソフトバンク','PayPayドーム','18:00','7月15日(土)','日本ハム','ベルーナドーム','18:00','7月16日(日)','日本ハム','ベルーナドーム','18:00','7月17日(月)','日本ハム','ベルーナドーム','18:00','7月22日(土)','楽天','ベルーナドーム','18:00','7月23日(日)','楽天','ベルーナドーム','18:00','7月25日(火)','ロッテ','ベルーナドーム','18:00','7月26日(水)','ロッテ','ベルーナドーム','18:00','7月28日(金)','楽天','楽天モバイル','18:00','7月29日(土)','楽天','楽天モバイル','18:00','7月30日(日)','楽天','楽天モバイル','17:00','8月1日(火)','ソフトバンク','ベルーナドーム','18:00','8月2日(水)','ソフトバンク','ベルーナドーム','18:00','8月4日(金)','オリックス','ベルーナドーム','18:00','8月5日(土)','オリックス','ベルーナドー ム','17:00','8月6日(日)','オリックス','ベルーナドーム','17:00','8月8日(火)','日本ハム','エスコンＦ','18:00','8月9日(水)','日本ハム','エスコンＦ','18:00','8月10日(木)','日本ハム','エスコンＦ','18:00','8月11日(金)','ロッテ','ZOZOマリン','18:00','8月12日(土)','ロッテ','ZOZOマリン','18:00','8月13日(日)','ロッテ','ZOZOマリン','17:00','8月15日(火)','楽天','ベルー ナドーム','18:00','8月16日(水)','楽天','ベルーナドーム','18:00','8月17日(木)','楽天','ベルーナドーム','18:00','8月18日( 金)','ソフトバンク','PayPayドーム','18:00','8月19日(土)','ソフトバンク','PayPayドーム','18:00','8月20日(日)','ソフトバンク','PayPayドーム','13:00','8月22日(火)','オリックス','ベルーナドーム','18:00','8月23日(水)','オリックス','ベルーナドー ム','18:00','8月24日(木)','オリックス','ベルーナドーム','18:00','8月25日(金)','日本ハム','ベルーナドーム','18:00','8月26日(土)','日本ハム','ベルーナドーム','17:00','8月27日(日)','日本ハム','ベルーナドーム','17:00','8月29日(火)','楽天','楽天モバイル','18:00','8月30日(水)','楽天','楽天モバイル','18:00','8月31日(木)','楽天','楽天モバイル','18:00','9月1日(金)','ソフトバンク','ベルーナドーム','18:00','9月2日(土)','ソフトバンク','ベルーナドーム','18:00','9月3日(日)','ソフトバンク','ベルーナドーム','13:00','9月5日(火)','オリックス','ほっと神戸','18:00','9月6日(水)','オリックス','ほっと神戸','18:00','9月8日(金)','日本ハム','エスコンＦ','18:00','9月9日(土)','日本ハム','エスコンＦ','14:00','9月10日(日)','日本ハム','エス コンＦ','13:00','9月12日(火)','ソフトバンク','ベルーナドーム','18:00','9月13日(水)','ソフトバンク','ベルーナドーム','18:00','9月14日(木)','ソフトバンク','ベルーナドーム','18:00','9月16日(土)','ロッテ','ベルーナドーム','13:00','9月17日(日)','ロッテ','ベルーナドーム','13:00','9月18日(月)','ロッテ','ベルーナドーム','13:00','9月19日(火)','日本ハム','ベルーナドーム','18:00','9月20日(水)','日本ハム','ベルーナドーム','18:00','9月21日(木)','楽天','楽天モバイル','18:00','9月23日(土)','ロッテ','ベルーナドーム','13:00','9月24日(日)','オリックス','京セラD大阪','18:00','9月25日(月)','オリックス','京セラD大阪','18:00','9月26日(火)','オリックス','京セラD大阪','18:00','9月27日(水)','楽天','ベルーナドーム','18:00','9月29日(金)','ソフトバンク','PayPayドーム','18:00','9月30日(土)','ロッテ','ZOZOマリン','18:00','10月1日(日)','ロッテ','ZOZOマリン','14:00','10月2日(月)','ロッテ','ZOZOマリン','18:00'];


  let date, vsteam, location, time;
  let id = 1146;
  const team = '西武';
  let countnum = 0;

  while (countnum < wholedate.length) {
    if ((countnum % 4) == 0) {
      date = wholedate[countnum];
    } else if ((countnum % 4) == 1) {
      vsteam = wholedate[countnum];
    } else if ((countnum % 4) == 2) {
      location = wholedate[countnum];
    } else if ((countnum % 4) == 3) {
      time = wholedate[countnum];
    }

    if ((countnum % 4) == 3) {
      db.serialize(() => {
        db.run('insert into calender (id, date, team, vsteam, location, time) values (?, ?, ?, ?, ?, ?)', id, date, team, vsteam, location, time);
      });  
      id ++;
    }

    countnum ++;
  }

  let data = {

  };
  res.render('forBeginners/example', data);
});





module.exports = router;
