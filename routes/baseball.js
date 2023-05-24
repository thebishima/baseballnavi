var express = require('express');
var router = express.Router();
//puppeteer部分
var puppeteer = require('puppeteer');
var path = require('path');
//

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

    var today = new Date();
    var a = today.getMonth() + 1;
    var b = today.getDate();

    var url = 'https://npb.jp/games/2023/';
    var rows = '';
    var rowsp = '';

    (async function () {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        //────────────────────────────────────────────────────────────上３行は書き換えない
        const thkun = await page.$$('.standings_wrap_c > .standing_table > table > thead > tr');//head部取得コード
        for (var h of thkun){
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for(hh of thhkun){
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>'+htmlh+'</th>';
            }
            rows += '</tr>';
        }

        const trkun = await page.$$('.standings_wrap_c > .standing_table > table > tbody > tr');//tdを取得する部分
        for (var e of trkun) {//取得されたtrを一行ずつ回す
            rows += '<tr>';
            const tdkun = await e.$$('td');//一行のtrの中にあるtdをすべて取得している
            const namekun = await e.$$('th');
            //ここにfor(var eee of namekun)を作ればよい??

            for (var eee of namekun) {//tr一行に存在するtdを一つずつ回す
                const namen = await page.evaluate(body => body.innerHTML, eee);
                rows += '<th>' + namen + '</th>';
            }

            for (var ee of tdkun) {//tr一行に存在するtdを一つずつ回す
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html)
                rows += '<td>' + html + '</td>';
            }
            rows += '</tr>';
        }
        console.log('────────────────────────────────────────');
        const thkunp = await page.$$('.standings_wrap_p > .standing_table > table > thead > tr');//head部取得コード
        for (var hp of thkunp){
            rowsp += '<tr>';
            const thhkunp = await hp.$$('th');
            for(hhp of thhkunp){
                const htmlhp = await page.evaluate(body => body.innerHTML, hhp);
                rowsp += '<th>'+htmlhp+'</th>';
            }
            rowsp += '</tr>';
        }

        const trkunp = await page.$$('.standings_wrap_p > .standing_table > table > tbody > tr');//tdを取得する部分
        for (var ep of trkunp) {//取得されたtrを一行ずつ回す
            rowsp += '<tr>';
            const tdkunp = await ep.$$('td');//一行のtrの中にあるtdをすべて取得している
            const namekunp = await ep.$$('th');

            for (var eeep of namekunp) {//tr一行に存在するtdを一つずつ回す
                const namenp = await page.evaluate(body => body.innerHTML, eeep);
                rowsp += '<th>' + namenp + '</th>';
            }

            for (var eep of tdkunp) {//tr一行に存在するtdを一つずつ回す
                const htmlp = await page.evaluate(body => body.innerHTML, eep);
                // console.log(html)
                rowsp += '<td>' + htmlp + '</td>';
            }
            rowsp += '</tr>';
        }

        data = {
            content: rows,
            contentp: rowsp,
            m:a,
            d:b,
        };
        // console.log(rows);

        res.render('baseball/juni', data);
    })();//tdを取得する部分
});

router.get('/seiseki', function (req, res, next) {
    res.render('baseball/seiseki', { title: 'Express' });
});

module.exports = router;