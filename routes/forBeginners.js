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
  if (nm != '' && pw != '') {
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
  } else {
    res.redirect('/forBeginners/login');
  }
});


// サインアップ
router.get('/signup', (req, res, next) => {
  if (req.cookies.name != null) {
    res.redirect('/forBeginners/account');
  }
  var data = {}
  res.render('forBeginners/signup', data);
});


let count;
router.post('/signup', (req, res, next) => {
  const nm = req.body.name;
  const pw = req.body.password;

  if (nm != '' && pw != '') {
    db.serialize(() => {
      function f1() {
        return new Promise((resolve, reject) => {
          db.each('select * from account', (err, row) => {
            if (nm == row.name) {
              res.redirect('/forBeginners/signup');
            }
          });
          resolve();
        });
      }

      function f2() {
        db.each('select * from account', (err, row) => {
          if (nm == row.name) {
            res.redirect('/forBeginners/signup');
          }
        });  
      }

      function f3() {
        db.get('select max(ID) as id from account ', (err, row) => {
          if (row != undefined) {
            count = row.id + 1;
          }
        });  
      }

      function f4 () {
        db.run('insert into account (id, name, password) values (?, ?, ?)', count, nm, pw);
        db.get('select * from account where name = ? and password = ?', [nm, pw], (err, row) => {
          if (row != undefined) {
            res.cookie('name', row.name);
            res.cookie('password', row.password);
            count++;
            res.redirect('/forBeginners/account');
          }
        });  
      }


      f1().then(() => {
        
      })
      
    });
  } else {
    res.redirect('/forBeginners/signup');
  }
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
const homeStation = { '神宮': '外苑前駅', 'バンテリンドーム': 'ナゴヤドーム前矢田', '甲子園': '甲子園駅', 'マツダスタジアム': '広島駅', '横浜': '関内', '東京ドーム': '水道橋駅', 'PayPayドーム': '唐人町駅', 'ベルーナドーム': '西武球場前駅', 'エスコンＦ': '北広島駅', '楽天モバイル': '宮城野原', 'ZOZOマリン': '海浜幕張', '京セラD大阪': 'ドーム前千代崎' };

router.get('/calender', function (req, res, next) {
  let accountTeam = req.cookies.team;
  let rows = '';
  const from = req.cookies.station;
  let m, d, ddate, dtime, hh, m1, m2, dminute, station, url, date;
  let monthCounter = 3;
  let month = 3;


  rows += '<div class="tab-pane fade show active" id="m' + month + '" role="tabpanel" aria-labelledby="m' + month + '-tab"><table class="table table-striped table-hover text-center"><tr><th>試合日</th><th>開始時間</th><th>対戦相手</th><th>球場</th><th>経路</th></tr>';

  if (accountTeam != undefined) {
    db.serialize(() => {
      db.each('select * from calender where team = ?', [teamArray[accountTeam]], (err, row) => {
        if (row != undefined) {
          month = row.date.substring(0, 1);
          if (month == '1') {
            month = '10';
          }

          if (month != monthCounter) {
            monthCounter++;
            rows += '</table></div><div class="tab-pane fade" id="m' + month + '" role="tabpanel" aria-labelledby="m' + month + '-tab"><table class="table table-striped table-hover text-center"><tr><th>試合日</th><th>開始時間</th><th>対戦相手</th><th>球場</th><th>経路</th></tr>';
          }

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

          rows += '<tr><td>' + row.date + '</td><td>' + row.time + '</td><td>' + row.vsteam + '</td><td>' + row.location + '</td><td>' + url + '</td></tr>';
        }
      }, (err, row) => {
        if (month == '9') {
          month = 10;
          rows += '</table></div><div class="tab-pane fade" id="m' + month + '" role="tabpanel" aria-labelledby="m' + month + '-tab"><table class="table table-striped table-hover text-center"><tr><th>試合日</th><th>開始時間</th><th>対戦相手</th><th>球場</th><th>経路</th></tr><tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>'
        }

        rows += '</table></div><footer><p class="copyright">&copy;BaseballNavi</p></footer>';
        let data = {
          content: accountTeam + 'の試合一覧',
          teamInfo: rows
        };
        res.render('forBeginners/calender', data);
      });
    });
  }









  else {
    let data = {
      content: '好きなチームを登録してください。<br>　↓　↓　↓',
      teamInfo: '<a href="/forBeginners/loginHome">ログインページ</a>へ'
    };
    res.render('forBeginners/calender', data);
  }

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
  let text = 'コメントが投稿されていません。'
  // db.serialize(() => {
  //   db.each('select * from comment', (err, row) => {
  //     if (row != undefined) {
  //       text += '<h3>' + row.name + ':' + row.time + '</h3><p>' + row.comment + '</p><hr>';
  //     }
  //   });
  // });


  var data = {
    // comment: text
  };
  res.render('forBeginners/guide/swallows', data);
});


// let commentCounter;
// router.post('/guide/swallows', function (req, res, next) {
//   let id = commentCounter;
//   let comment = req.body.comment;
//   let name = req.cookies.name;
//   if (name == '') {
//     name = '名無し';
//   }
//   let text = '';
//   let date = new Date();
//   let year = date.getFullYear();
//   let month = date.getMonth() + 1;
//   let day = date.getDate();
//   let hours = date.getHours();
//   let minutes = date.getMinutes();
//   let seconds = date.getSeconds();
//   let time = year + '年' + month + '月' + day + '日' + hours + '時' + minutes + '分' + seconds + '秒';

//   db.serialize(() => {
//     db.get('select max(id) as id from comment', (err, row) => {
//       if (row != undefined) {
//         console.log('first' + commentCounter);
//         commentCounter = row.id + 1;
//         console.log('second' + commentCounter);
//       }
//     });

//     console.log('third' + commentCounter);

//     db.run('insert into comment (id, time, name, comment) values (?, ?, ?, ?)', commentCounter, time, name, comment);
//     db.each('select * from comment', (err, row) => {
//       if (row != undefined) {
//         text += '<h5>' + row.name + ':' + row.time + '</h5><p>' + row.comment + '</p><hr>';
//         console.log(text);
//       }
//     }, (err, row) => {
//       var data = {
//         comment: text
//       };
//       res.render('forBeginners/guide/swallows', data);
//     });
//   });
// });




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