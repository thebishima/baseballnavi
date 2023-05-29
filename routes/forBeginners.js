var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('account.sqlite3');

// トップページ
router.get('/', function (req, res, next) {
  var data = {};
  res.render('forBeginners/index', data);
});


// ログインorサインアップページ
router.get('/loginHome', function (req, res, next) {
  if (req.cookies.name != null) {
    res.redirect('/forBeginners/account');
  }
  var data = {}
  res.render('forBeginners/loginHome', data);
});


// ログインページ
router.get('/login', function (req, res, next) {
  if (req.cookies.name != null) {
    res.redirect('/forBeginners/account');
  }
  var data = {}
  res.render('forBeginners/login', data);
});

router.post('/login', (req, res, next) => {
  let nm = req.body.name;
  let pw = req.body.password;
  db.serialize(() => {
    db.get('select * from account where name = ? and password = ?', [nm, pw], (err, row) => {
      if (row != undefined) {
        res.cookie('name', row.name);
        res.cookie('password', row.password);
        res.cookie('team', row.team);
        res.cookie('station', row.station);
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
  var data = {}
  res.render('forBeginners/signup', data);
});

let count;
router.post('/signup', (req, res, next) => {
  const nm = req.body.name;
  const pw = req.body.password;

  db.serialize(() => {
    db.get('select max(ID) as id from account ', (err, row) => {
      if (row != undefined) {
        count = row.id + 1;
        console.log(count);
      }
    });

    db.run('insert into account (id, name, password) values (?, ?, ?)', count, nm, pw);
    db.get('select * from account where name = ? and password = ?', [nm, pw], (err, row) => {
      if (row != undefined) {
        res.cookie('name', row.name);
        res.cookie('password', row.password);
        count++;
        res.redirect('/forBeginners/account');
      }
    });
  });
});


// アカウント管理ページ 好きな球団フォームの初期値の実装　要検討
router.get('/account', function (req, res, next) {
  let name = req.cookies.name;
  let password = req.cookies.password;
  let station = req.cookies.station;
  let team = req.cookies.team;

  if (name != null) {
    var data = {
      name: name,
      valueName: name,
      valuePassword: password,
      valueStation: station
    }
  } else {
    res.redirect('/forBeginners/loginHome');
  }
  res.render('forBeginners/account', data);
});

router.post('/account', (req, res, next) => {
  let accountName = req.cookies.name;
  let accountPassword = req.cookies.password;
  let accountStation = req.cookies.station;
  let accountTeam = req.cookies.team;
  let nm, pw, st, te;
  if (req.body.name != '') {
    nm = req.body.name;
  }
  if (req.body.password != '') {
    pw = req.body.password;
  }
  if (req.body.station != '') {
    st = req.body.station;
  }
  if (req.body.team != '') {
    te = req.body.team;
  }

  if (pw != undefined) {
    db.serialize(() => {
      db.run('update account set password = ? where name = ?', [pw, accountName]);
      res.clearCookie("password");
      res.cookie('password', pw);
    });
  }
  if (st != undefined) {
    db.serialize(() => {
      db.run('update account set station = ? where name = ?', [st, accountName]);
      res.clearCookie("station");
      res.cookie('station', st);
    });
  }
  if (te != undefined) {
    db.serialize(() => {
      db.run('update account set team = ? where name = ?', [te, accountName]);
      res.clearCookie("team");
      res.cookie('team', te);
    });
  }
  if (nm != undefined) { //nmを最後に変更する
    db.serialize(() => {
      db.run('update account set name = ? where name = ?', [nm, accountName]);
      res.clearCookie("name");
      res.cookie('name', nm);
    });
  }

  res.redirect('/forBeginners/account');
});


// ログアウト用ページ　
router.get("/deletecookie", function (req, res, next) {
  const result = req.query.torf;

  if (result == 'true') {
    res.clearCookie("name");
    res.clearCookie("password");
    res.clearCookie("team");
    res.clearCookie("station");
    res.redirect('/forBeginners/loginHome');
  }

  res.redirect('/forBeginners/account');
});


// 日程表ページ
let teamArray = { '東京ヤクルトスワローズ': 'ヤクルト', '横浜DeNAベイスターズ': 'DeNA', '阪神タイガース': '阪神', '読売ジャイアンツ': '巨人', '広島東洋カープ': '広島', '中日ドラゴンズ': '中日', 'オリックス・バファローズ': 'オリックス', '福岡ソフトバンクホークス': 'ソフトバンク', '埼玉西武ライオンズ': '西武', '東北楽天ゴールデンイーグルス': '楽天', '千葉ロッテマリーンズ': 'ロッテ', '北海道日本ハムファイターズ': '日本ハム' };
let teamArrayReverse = { 'ヤクルト': '東京ヤクルトスワローズ', 'DeNA': '横浜DeNAベイスターズ', '阪神': '阪神タイガース', '巨人': '読売ジャイアンツ', '広島': '広島東洋カープ', '中日': '中日ドラゴンズ', 'オリックス': 'オリックス・バファローズ', 'ソフトバンク': '福岡ソフトバンクホークス', '西武': '埼玉西武ライオンズ', '楽天': '東北楽天ゴールデンイーグルス', 'ロッテ': '千葉ロッテマリーンズ', '日本ハム': '北海道日本ハムファイターズ' };
const homeStudium = { '北海道日本ハムファイターズ': '北広島駅', '東北楽天ゴールデンイーグルス': '宮城野原', '千葉ロッテマリーンズ': '海浜幕張', '読売ジャイアンツ': '水道橋駅', '東京ヤクルトスワローズ': '外苑前駅', '横浜DeNAベイスターズ': '関内', '埼玉西武ライオンズ': '西武球場前駅', '中日ドラゴンズ': 'ナゴヤドーム前矢田', 'オリックス・バファローズ': 'ドーム前千代崎', '阪神タイガース': '甲子園駅', '広島東洋カープ': '広島駅', '福岡ソフトバンクホークス': '唐人町駅' };
const homeStation = { '神宮': '外苑前駅', 'バンテリンドーム': 'ナゴヤドーム前矢田', '甲子園': '甲子園駅', 'マツダスタジアム': '広島駅', '横浜': '関内', '東京ドーム': '水道橋駅', 'PayPayドーム': '唐人町駅', 'ベルーナドーム': '西武球場前駅', 'エスコンF': '北広島駅', '楽天モバイル': '宮城野原', 'ZOZOマリン': '海浜幕張', '京セラD大阪': 'ドーム前千代崎' };

router.get('/calender', function (req, res, next) {
  let accountTeam = req.cookies.team;
  let rows = '';

  db.serialize(() => {
    db.each('select * from calender where team = ?', [teamArray[accountTeam]], (err, row) => {
      if (row != undefined) {
        rows += '<input type="radio" value="' + row.date + '" name="postDate">' + row.date + row.team + row.vsteam + row.location + row.time + '<br>';
      }
    }, (err, row) => {
      let data = {
        content: accountTeam,
        teamInfo: rows
      };
      res.render('forBeginners/calender', data);
    });
  });
});


// 経路検索ページ
router.post('/route', function (req, res, next) {
  const postDate = req.body.postDate;
  const cookieTeam = teamArray[req.cookies.team];
  const from = req.cookies.station;
  let m, d, ddate, dtime, hh, m1, m2, dminute, station, url, date;

  db.serialize(() => {
    db.each('select * from calender where team = ? and date = ?', [cookieTeam, postDate], (err, row) => {
      if (row != undefined) {
        date = row.date + row.time + 'VS' + row.vsteam + 'in' + row.location;

        ddate = row.date;
        ddate = ddate.split(/月|日/g);
        m = ddate[0];
        if (m < 10) {
          m = '0' + m;
        }
        d = ddate[1];
        if (d < 10) {
          d = '0' + d;
        }

        dtime = row.time;
        dtime = dtime.split(':');
        hh = dtime[0] - 1;
        if (hh < 10) {
          hh = '0' + hh;
        }
        dminute = dtime[1];
        dminute = dminute.slice('');
        m1 = dminute[0];
        m2 = dminute[1];

        station = homeStation[row.location];

        url = '<a href="https://transit.yahoo.co.jp/search/result?from=' + from + '&to=%' + station + '&fromgid=&togid=&flatlon=&tlatlon=&via=&viacode=&y=2023&m=' + m + '&d=' + d + '&hh=' + hh + '&m1=' + m1 + '&m2=' + m2 + '&type=4&ticket=ic&expkind=1&userpass=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1" target="_blank">経路検索</a>';
      }
    }, (err, row) => {
      let data = {
        targetData: date,
        url: url
      };
      res.render('forBeginners/route', data);
    });
  });
});


// ガイド
router.get('/guide/guideHome', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/guideHome', data);
});


router.get('/guide/ticket', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/ticket', data);
});


router.get('/guide/swallows', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/swallows', data);
});


router.get('/guide/baystars', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/baystars', data);
});


router.get('/guide/tigers', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/tigers', data);
});


router.get('/guide/giants', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/giants', data);
});


router.get('/guide/carp', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/carp', data);
});


router.get('/guide/dragons', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/dragons', data);
});


router.get('/guide/buffaloes', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/buffaloes', data);
});


router.get('/guide/hawks', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/hawks', data);
});


router.get('/guide/lions', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/lions', data);
});


router.get('/guide/eagles', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/eagles', data);
});


router.get('/guide/marines', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/marines', data);
});


router.get('/guide/fighters', function (req, res, next) {
  var data = {};
  res.render('forBeginners/guide/fighters', data);
});



module.exports = router;