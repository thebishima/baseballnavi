var express = require('express');
var router = express.Router();
//puppeteer部分
var puppeteer = require('puppeteer');
var path = require('path');
const { chownSync } = require('fs');
//

/* GET home page. */
router.get('/', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────総合/試合速報
    var today = new Date();//───────────────────────変数を書く場所
    var a = today.getMonth() + 1;
    var b = today.getDate();

    var countl = 0;
    var countc = 0;
    var countr = 0;

    var rowsl1 = '';
    var rowsl2 = '';
    var rowsc1 = '';
    var rowsc2 = '';
    var rowsr1 = '';
    var rowsr2 = '';
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/games/2023/';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        //-------------------------------------------------------------------------------------------------------------------------left開始
        var t = await page.$$('.three_column_left > .link_block > .score_table_wrap > .score_table > table > tbody > tr');
        for (var e of t) {//---
            var aaa = await e.$$('td');
            rowsl1 += '<tr>';
            rowsl2 += '<tr>';

            for (var e2 of aaa) {
                if (countl < 2) {
                    const html = await page.evaluate(body => body.innerHTML, e2);
                    if (countl == 1) {
                        rowsl1 += '<td colspan="5" class="align-middle">' + html + '</td>';
                    } else {
                        rowsl1 += '<td>' + html + '</td>';
                    }
                    // console.log(html);
                } else {
                    const htmls = await page.evaluate(body => body.innerHTML, e2);
                    if (countl == 3) {
                        rowsl2 += '<td colspan="5" class="align-middle">' + htmls + '</td>';
                    } else {
                        rowsl2 += '<td>' + htmls + '</td>';
                    }
                    // console.log(htmls);
                }
            }
            rowsl1 += '</tr>';
            rowsl2 += '</tr>';
            countl++;

        }//---
        t = await page.$$('.three_column_left > .link_block > .score_table_wrap > .pit_table > table > tbody > tr');
        countl = 0;
        for (var e of t) {
            var aaa = await e.$$('td');
            rowsl1 += '<tr>';
            rowsl2 += '<tr>';
            for (var e2 of aaa) {
                if (countl < 2) {
                    const html = await page.evaluate(body => body.innerHTML, e2);
                    rowsl1 += '<td>' + html + '</td>'
                    // console.log(html);
                } else {
                    const htmls = await page.evaluate(body => body.innerHTML, e2);
                    rowsl2 += '<td>' + htmls + '</td>';
                    // console.log(htmls);
                }
            }
            rowsl1 += '</tr>';
            rowsl2 += '</tr>';
            countl++;
        }
        //-----------------------------------------------------------------------------------------------------left終了
        //-----------------------------------------------------------------------------------------------------center開始
        var t = await page.$$('.three_column_center > .link_block > .score_table_wrap > .score_table > table > tbody > tr');
        countl = 0;
        for (var e of t) {//---
            var aaa = await e.$$('td');
            rowsc1 += '<tr>';
            rowsc2 += '<tr>';

            for (var e2 of aaa) {
                if (countl < 2) {
                    const html = await page.evaluate(body => body.innerHTML, e2);
                    if (countl == 1) {
                        rowsc1 += '<td colspan="5" class="align-middle">' + html + '</td>';
                    } else {
                        rowsc1 += '<td>' + html + '</td>';
                    }
                    // console.log(html);
                } else {
                    const htmls = await page.evaluate(body => body.innerHTML, e2);
                    if (countl == 3) {
                        rowsc2 += '<td colspan="5" class="align-middle">' + htmls + '</td>';
                    } else {
                        rowsc2 += '<td>' + htmls + '</td>';
                    }
                    // console.log(htmls);
                }
            }
            rowsc1 += '</tr>';
            rowsc2 += '</tr>';
            countl++;
        }
        t = await page.$$('.three_column_center > .link_block > .score_table_wrap > .pit_table > table > tbody > tr');
        countl = 0;
        for (var e of t) {
            var aaa = await e.$$('td');
            rowsc1 += '<tr>';
            rowsc2 += '<tr>';
            for (var e2 of aaa) {
                if (countl < 2) {
                    const html = await page.evaluate(body => body.innerHTML, e2);
                    rowsc1 += '<td>' + html + '</td>'
                    // console.log(html);
                } else {
                    const htmls = await page.evaluate(body => body.innerHTML, e2);
                    rowsc2 += '<td>' + htmls + '</td>';
                    // console.log(htmls);
                }
            }
            rowsc1 += '</tr>';
            rowsc2 += '</tr>';
            countl++;
        }
        //-----------------------------------------------------------------------------------------------------center終了
        //-----------------------------------------------------------------------------------------------------right開始
        var t = await page.$$('.three_column_right > .link_block > .score_table_wrap > .score_table > table > tbody > tr');
        countl = 0;
        for (var e of t) {//---
            var aaa = await e.$$('td');
            rowsr1 += '<tr>';
            rowsr2 += '<tr>';

            for (var e2 of aaa) {
                if (countl < 2) {
                    const html = await page.evaluate(body => body.innerHTML, e2);
                    if (countl == 1) {
                        rowsr1 += '<td colspan="5" class="align-middle">' + html + '</td>';
                    } else {
                        rowsr1 += '<td>' + html + '</td>';
                    }
                    // console.log(html);
                } else {
                    const htmls = await page.evaluate(body => body.innerHTML, e2);
                    if (countl == 3) {
                        rowsr2 += '<td colspan="5" class="align-middle">' + htmls + '</td>';
                    } else {
                        rowsr2 += '<td>' + htmls + '</td>';
                    }
                    // console.log(htmls);
                }
            }
            rowsr1 += '</tr>';
            rowsr2 += '</tr>';
            countl++;
        }
        t = await page.$$('.three_column_right > .link_block > .score_table_wrap > .pit_table > table > tbody > tr');
        countl = 0;
        for (var e of t) {
            var aaa = await e.$$('td');
            rowsr1 += '<tr>';
            rowsr2 += '<tr>';
            for (var e2 of aaa) {
                if (countl < 2) {
                    const html = await page.evaluate(body => body.innerHTML, e2);
                    rowsr1 += '<td>' + html + '</td>'
                    // console.log(html);
                } else {
                    const htmls = await page.evaluate(body => body.innerHTML, e2);
                    rowsr2 += '<td>' + htmls + '</td>';
                    // console.log(htmls);
                }
            }
            rowsr1 += '</tr>';
            rowsr2 += '</tr>';
            countl++;
        }



        //-----------------------------------------------------------------------------------------------------right終了
        //─────────────────────────────────────────────────────────────────────ここまでスクレイピング
        //------------------------------------------------------------------データの受け渡しへ
        data = {
            month: a,
            day: b,
            contentl1: rowsl1,
            contentc1: rowsc1,
            contentr1: rowsr1,
            contentl2: rowsl2,
            contentc2: rowsc2,
            contentr2: rowsr2,
        };
        res.render('baseball/index', data);
    })();




});

router.get('/nittei', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────年間日程表
    var today = new Date();//───────────────────────変数を書く場所
    var y = today.getFullYear();
    var rows = '';
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/games/2023/schedule_05_detail.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const t = await page.$$('.table_normal summary_table > table > thead > tr');
        for(var e of t){
            const tt = await e.$$('th');
            for(var ee of tt){
                const html = await page.evaluate(body => body.innerHTML, ee);
                console.log(html);
            }
        }
        // rows = '<tr><td>test</td></tr>'
        //─────────────────────────────────────────────────────────────────────ここまでスクレイピング
        //------------------------------------------------------------------データの受け渡しへ
        var data = {
            year: y,
            content: rows,
        };
        res.render('baseball/nittei', data);
    })();
});



router.get('/juni', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────順位表

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
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                console.log(htmlh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const trkun = await page.$$('.standings_wrap_c > .standing_table > table > tbody > tr');//tdを取得する部分
        for (var e of trkun) {//取得されたtrを一行ずつ回す
            rows += '<tr>';
            const tdkun = await e.$$('td');//一行のtrの中にあるtdをすべて取得している
            const namekun = await e.$$('th');


            for (var eee of namekun) {//tr一行に存在するtdを一つずつ回す
                const namen = await eee.$$('.hide_sp');
                for (var eeee of namen) {
                    const namenn = await page.evaluate(body => body.innerHTML, eeee);
                    rows += '<th>' + namenn + '</th>';
                }
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
        for (var hp of thkunp) {
            rowsp += '<tr>';
            const thhkunp = await hp.$$('th');
            for (hhp of thhkunp) {
                const htmlhp = await page.evaluate(body => body.innerHTML, hhp);
                rowsp += '<th>' + htmlhp + '</th>';
            }
            rowsp += '</tr>';
        }

        const trkunp = await page.$$('.standings_wrap_p > .standing_table > table > tbody > tr');//tdを取得する部分
        for (var ep of trkunp) {//取得されたtrを一行ずつ回す
            rowsp += '<tr>';
            const tdkunp = await ep.$$('td');//一行のtrの中にあるtdをすべて取得している
            const namekunp = await ep.$$('th');

            for (var eeep of namekunp) {//tr一行に存在するtdを一つずつ回す
                const namenpp = await eeep.$$('.hide_sp');
                for (var eeeep of namenpp) {
                    const namenkunppp = await page.evaluate(body => body.innerHTML, eeeep);
                    rowsp += '<th>' + namenkunppp + '</th>';
                }
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
            m: a,
            d: b,
        };
        // console.log(rows);

        res.render('baseball/juni', data);
    })();//tdを取得する部分
});
router.get('/seiseki', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────成績表
    res.render('baseball/seiseki', { title: 'Express' });
});

module.exports = router;