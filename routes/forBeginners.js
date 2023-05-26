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


// ログインページ　チェック機能の追加　要検討
const { check, validationResult, cookie } = require('express-validator');

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


// サインアップ idの部分を要改善
router.get('/signup', (req, res, next) => {
  var data = {}
  res.render('forBeginners/signup', data);
});

let count;
router.post('/signup', (req, res, next) => {
  const nm = req.body.name;
  const pw = req.body.password;
  const te = req.body.team;
  const st = req.body.station;

  db.serialize(() => {
    db.get('select max(ID) as id from account ', (err, row) => {
      if (row != undefined) {
        count = row.id + 1;
        console.log(count);
      }
    });

    db.run('insert into account (id, name, password, team, station) values (?, ?, ?, ?, ?)', count, nm, pw, te, st);
    db.get('select * from account where name = ? and password = ?', [nm, pw], (err, row) => {
      if (row != undefined) {
        res.cookie('name', row.name);
        res.cookie('password', row.password);
        res.cookie('team', row.team);
        res.cookie('station', row.station);
        count++;
        res.redirect('/forBeginners/account');
      }
    });
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
      console.log(nm);
      res.clearCookie("name");
      res.cookie('name', nm);
    });  
  }


  res.redirect('/forBeginners/account');
});


// ログアウト用ページ　
router.post("/deletecookie", function (req, res, next) {
  res.clearCookie("name");
  res.clearCookie("password");
  res.clearCookie("team");
  res.clearCookie("station");
  res.redirect('/forBeginners');
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



// スクレイピング用ページ　触るな！
// router.get('/example', (req, res, next) => {
//   let wholedate = ['3月31日(金)','阪神','京セラD大阪','18:00','4月1日(土)','阪神','京セラD大阪','14:00','4月2日(日)','阪神','京セラD大阪','14:00','4月4日(火)','巨人','横浜','18:30','4月5日(水)','巨人','横浜','18:00','4月6日(木)','巨人','横浜','18:00','4月7日(金)','中日','横浜','18:00','4月8日(土)','中日','横浜','14:00','4月9日(日)','中日','横浜','14:00','4月11日(火)','ヤクルト','神宮','18:00','4月12日(水)','ヤクルト','神宮','18:00','4月14日(金)','阪神','横浜','18:00','4月15日(土)','阪神','横浜','14:00','4月16日(日)','阪神','横浜','14:00','4月18日(火)','巨人','長崎','18:00','4月19日(水)','巨人','佐賀','18:00','4月21日(金)','広島','マツダスタジアム','18:00','4月22日(土)','広島','マツダスタジアム','14:00','4月23日(日)','広島','マツダスタジアム','13:30','4月25日(火)','ヤクルト','横浜','17:45','4月26日(水)','ヤクルト','横浜','17:45','4月27日(木)','ヤクルト','横浜','17:45','4月28日(金)','中日','バンテリンドーム','18:00','4月29日(土)','中日','バンテリンドーム','14:00','4月30日(日)','中日','バンテリンドーム','14:00','5月2日(火)','広島','横浜','18:00','5月3日(水)','広島','横浜','14:00','5月4日(木)','広島','横浜','14:00','5月5日(金)','ヤクルト','神宮','14:00','5月6日(土)','ヤクルト','神宮','18:00','5月7日(日)','ヤクルト','神宮','18:00','5月9日(火)','巨人','新潟','18:00','5月11日(木)','巨人','横浜','18:00','5月12日(金)','阪神','甲子園','18:00','5月13日(土)','阪神','甲子園','14:00','5月14日(日)','阪神','甲子園','14:00','5月16日(火)','広島','横浜','18:00','5月17日(水)','広島','横浜','18:00','5月18日(木)','広島','横浜','18:00','5月19日(金)','ヤクルト','横浜','18:00','5月20日(土)','ヤクルト','横浜','14:00','5月21日(日)','ヤクルト','横浜','14:00','5月23日(火)','巨人','東京ドーム','18:00','5月24日(水)','巨人','東京ドーム','18:00','5月25日(木)','巨人','東京ドーム','18:00','5月26日(金)','中日','バンテリンドーム','18:00','5月27日(土)','中日','バンテリンドーム','14:00','5月28日(日)','中日','バンテリンドーム','14:00','5月30日(火)','楽天','楽天モバイル','18:00','5月31日(水)','楽天','楽天モバイル','18:00','6月1日(木)','楽天','楽天モバイル','18:00','6月2日(金)','西武','横浜','18:00','6月3日(土)','西武','横浜','14:00','6月4日(日)','西武','横浜','14:00','6月6日(火)','ソフトバンク','PayPayドーム','18:00','6月7日(水)','ソフトバンク','PayPayドーム','18:00','6月8日(木)','ソフトバンク','PayPayドーム','18:00','6月9日(金)','オリックス','京セラD大阪','18:00','6月10日(土)','オリックス','京セラD大阪','14:00','6月11日(日)','オリックス','京セラD大阪','13:00','6月13日(火)','日本ハム','横浜','18:00','6月14日(水)','日本ハム','横 浜','18:00','6月15日(木)','日本ハム','横浜','18:00','6月16日(金)','ロッテ','横浜','18:00','6月17日(土)','ロッテ','横浜','14:00','6月18日(日)','ロッテ','横浜','14:00','6月23日(金)','阪神','横浜','18:00','6月24日(土)','阪神','横浜','14:00','6月25日(日)','阪神','横浜','14:00','6月27日(火)','広島','マツダスタジアム','18:00','6月28日(水)','広島','マツダスタジアム','18:00','6月29日(木)','広島','マツダスタジアム','18:00','6月30日(金)','中日','横浜','18:00','7月1日(土)','中日','横浜','14:00','7月2日(日)','中日','横浜','14:00','7月4日(火)','ヤクルト','横浜','18:00','7月5日(水)','ヤクルト','横浜','18:00','7月6日(木)','ヤクルト','横浜','18:00','7月7日(金)','巨人','東京ドーム','18:00','7月8日(土)','巨人','東京ドーム','18:00','7月9日(日)','巨人','東京ドーム','14:00','7月11日(火)','阪神','倉敷','18:00','7月12日(水)','阪神','甲子園','18:00','7月13日(木)','阪神','甲子園','18:00','7月15日(土)','広島','横浜','17:00','7月16日(日)','広島','横浜','17:00','7月17日(月)','広島','横浜','17:00','7月22日(土)','巨人','横浜','18:00','7月23日(日)','巨人','横浜','17:00','7月25日(火)','中日','バンテリンドーム','18:00','7月26日(水)','中日','バンテリンドーム','18:00','7月27日(木)','中日','バンテリンドーム','18:00','7月28日(金)','ヤクルト','神宮','18:00','7月29日(土)','ヤクルト','神宮','18:00','7月30日(日)','ヤクルト','神宮','18:00','8月1日(火)','広島','マツダスタジアム','18:00','8月2日(水)','広島','マツダスタジアム','18:00','8月3日(木)','広島','マツ ダスタジアム','18:00','8月4日(金)','阪神','横浜','17:45','8月5日(土)','阪神','横浜','17:00','8月6日(日)','阪神','横浜','17:00','8月8日(火)','中日','横浜','17:45','8月9日(水)','中日','横浜','17:45','8月10日(木)','中日','横浜','17:45','8月11 日(金)','巨人','東京ドーム','14:00','8月12日(土)','巨人','東京ドーム','14:00','8月13日(日)','巨人','東京ドーム','14:00','8月15日(火)','ヤクルト','神宮','18:00','8月16日(水)','ヤクルト','神宮','18:00','8月17日(木)','ヤクルト','神宮','18:00','8月18日(金)','阪神','横浜','18:00','8月19日(土)','阪神','横浜','18:00','8月20日(日)','阪神','横浜','17:00','8月22日(火)','広島','横浜','18:00','8月23日(水)','広島','横浜','18:00','8月24日(木)','広島','横浜','18:00','8月25日(金)','中日','バンテリンドーム','18:00','8月26日(土)','中日','バンテリンドーム','14:00','8月27日(日)','中日','バンテリンドーム','14:00','8月29日(火)','阪神','甲子園','18:00','8月30日(水)','阪神','甲子園','18:00','9月1日(金)','巨人','横浜','18:00','9月2日( 土)','巨人','横浜','18:00','9月3日(日)','巨人','横浜','17:00','9月5日(火)','広島','マツダスタジアム','18:00','9月6日(水)','広島','マツダスタジアム','18:00','9月7日(木)','広島','マツダスタジアム','18:00','9月8日(金)','ヤクルト','横浜','18:00','9月9日(土)','ヤクルト','横浜','14:00','9月10日(日)','ヤクルト','横浜','14:00','9月12日(火)','中日','横浜','18:00','9 月13日(水)','中日','横浜','18:00','9月15日(金)','ヤクルト','神宮','18:00','9月16日(土)','ヤクルト','神宮','18:00','9月17日(日)','阪神','甲子園','18:00','9月18日(月)','阪神','甲子園','14:00','9月20日(水)','広島','マツダスタジアム','18:00','9月22日(金)','中日','横浜','18:00','9月23日(土)','中日','横浜','14:00','9月24日(日)','巨人','横浜','14:00','9月25日(月)','巨人','横浜','18:00','9月26日(火)','巨人','横浜','18:00'];


//   let date, vsteam, location, time;
//   let id = 144;
//   const team = 'DeNA';
//   let countnum = 0;

//   while (countnum < wholedate.length) {
//     if ((countnum % 4) == 0) {
//       date = wholedate[countnum];
//     } else if ((countnum % 4) == 1) {
//       vsteam = wholedate[countnum];
//     } else if ((countnum % 4) == 2) {
//       location = wholedate[countnum];
//     } else if ((countnum % 4) == 3) {
//       time = wholedate[countnum];
//     }

//     if ((countnum % 4) == 3) {
//       db.serialize(() => {
//         db.run('insert into calender (id, date, team, vsteam, location, time) values (?, ?, ?, ?, ?, ?)', id, date, team, vsteam, location, time);
//       });  
//       id ++;
//     }

//     countnum ++;
//   }

//   let data = {

//   };
//   res.render('forBeginners/example', data);
// });

module.exports = router;