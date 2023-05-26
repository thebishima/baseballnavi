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
                // console.log(htmlh);
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
    var today = new Date();
    var a = today.getFullYear();

    data = {
        year: a,
    };

    res.render('baseball/seiseki', data);
});


















router.get('/hanshin', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────阪神選手一覧
    var today = new Date();
    var a = today.getFullYear();
    var countth = 1;
    var counttd = 1;

    var th1 = '';
    var th2 = '';
    var th3 = '';
    var th4 = '';
    var th5 = '';
    var th6 = '';
    var th7 = '';

    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';
    var td5 = '';
    var td6 = '';
    var td7 = '';


    var rows = '';
    var rows2 = '';
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_t.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);


        //thead取得部分
        const t = await page.$$('.rosterdivlisttbl > table > tbody > tr');
        th1 += '<tr>';
        th2 += '<tr>';
        th3 += '<tr>';
        th4 += '<tr>';
        th5 += '<tr>';
        th6 += '<tr>';
        th7 += '<tr>';
        for (var e of t) {
            const tt = await e.$$('th');
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (countth == 1) {
                    th1 += '<th>' + html + '</th>'
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>'
                } else if (countth == 37) {
                    th3 += '<th>' + html + '</th>'
                } else if (countth == 45) {
                    th4 += '<th>' + html + '</th>'
                } else if (countth == 61) {
                    th5 += '<th>' + html + '</th>'
                } else if (countth == 75) {
                    th6 += '<th>' + html + '</th>'
                } else if (countth == 80) {
                    th7 += '<th>' + html + '</th>'
                }
            }
            // console.log(countth);
            countth++;
        }
        th1 += '</tr>';
        th2 += '</tr>';
        th3 += '</tr>';
        th4 += '</tr>';
        th5 += '</tr>';
        th6 += '</tr>';
        th7 += '</tr>';

        for (var e of t) {
            const tt = await e.$$('td');
            if (counttd == 2) {
                td1 += '<tr>'
            } else if (counttd > 3 && counttd < 37) {
                td2 += '<tr>'
            } else if (counttd > 37 && counttd < 45) {
                td3 += '<tr>'
            } else if (counttd > 45 && counttd < 61) {
                td4 += '<tr>'
            } else if (counttd > 61 && counttd <75) {
                td5 += '<tr>'
            } else if (counttd > 75 && counttd <80) {
                td6 += '<tr>'
            } else if (counttd == 81) {
                td7 += '<tr>'
            }
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>'
                } else if (counttd > 3 && counttd < 37) {
                    td2 += '<td>' + html + '</td>'
                } else if (counttd > 37 && counttd < 45) {
                    td3 += '<td>' + html + '</td>'
                } else if (counttd > 45 && counttd < 61) {
                    td4 += '<td>' + html + '</td>'
                } else if (counttd > 61 && counttd <75) {
                    td5 += '<td>' + html + '</td>'
                } else if (counttd > 75 && counttd <80) {
                    td6 += '<td>' + html + '</td>'
                } else if (counttd == 81) {
                    td7 += '<td>' + html + '</td>'
                }
            }
            // console.log(countth);
            if (counttd == 2) {
                td1 += '</tr>'
            } else if (counttd > 3 && counttd < 37) {
                td2 += '</tr>'
            } else if (counttd > 37 && counttd < 45) {
                td3 += '</tr>'
            } else if (counttd > 45 && counttd < 61) {
                td4 += '</tr>'
            } else if (counttd > 61 && counttd <75) {
                td5 += '</tr>'
            } else if (counttd > 75 && counttd <80) {
                td6 += '</tr>'
            } else if (counttd == 81) {
                td7 += '</tr>'
            }

            counttd++;
        }

        rows += th1;
        rows += td1;
        rows += th2;
        rows += td2;
        rows += th3;
        rows += td3;
        rows += th4;
        rows += td4;
        rows += th5;
        rows += td5;
        rows2 += th6;
        rows2 += td6;
        rows2 += th7;
        rows2 += td7;


        //------------------------------------------------------------------データの受け渡しへ
        data = {
            year: a,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/hanshin', data);
    })();

});


































router.get('/m3', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────3月
    var today = new Date();//───────────────────────変数を書く場所
    var y = today.getFullYear();
    var rows1 = '';
    var countr = 0;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/games/2023/schedule_03_detail.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // const t = await page.$('.table_normal> table > thead > tr > .date');
        // const tt = await page.evaluate(body => body.innerHTML, t);
        // console.log(tt);


        //thead取得部分
        const t = await page.$$('.table_normal> table > thead > tr');
        for (var e of t) {
            const tt = await e.$$('th');
            rows1 += '<tr>';
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<th>' + html + '</th>'
                // console.log(html);
            }
            rows1 += '</tr>';
        }
        //tbody取得部分
        const tb = await page.$$('.table_normal> table > tbody > tr');
        for (var e of tb) {
            const tth = await e.$$('th');
            const ttb = await e.$$('td');
            rows1 += '<tr>';
            for (var ee of tth) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                if (countr == 1) {
                    rows1 += '<th rowspan="5">' + html + '</th>'
                } else {
                    rows1 += '<th>' + html + '</th>'
                }

                // console.log(html);
            }
            for (var ee of ttb) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<td>' + html + '</td>'
                // console.log(html);
            }
            rows1 += '</tr>';
            countr++;
        }


        //─────────────────────────────────────────────────────────────────────ここまでスクレイピング
        //------------------------------------------------------------------データの受け渡しへ
        var data = {
            year: y,
            content: rows1,
        };
        res.render('baseball/m3', data);
    })();
});












router.get('/m4', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────4月
    var today = new Date();//───────────────────────変数を書く場所
    var y = today.getFullYear();
    var rows1 = '';
    var countr = 0;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/games/2023/schedule_04_detail.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // const t = await page.$('.table_normal> table > thead > tr > .date');
        // const tt = await page.evaluate(body => body.innerHTML, t);
        // console.log(tt);


        //thead取得部分
        const t = await page.$$('.table_normal> table > thead > tr');
        for (var e of t) {
            const tt = await e.$$('th');
            rows1 += '<tr>';
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<th>' + html + '</th>'
                // console.log(html);
            }
            rows1 += '</tr>';
        }
        //tbody取得部分
        const tb = await page.$$('.table_normal> table > tbody > tr');
        for (var e of tb) {
            const tth = await e.$$('th');
            const ttb = await e.$$('td');
            rows1 += '<tr>';
            for (var ee of tth) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                if (countr == 0 || countr == 6 || countr == 13 || countr == 19 || countr == 25 || countr == 35 || countr == 41 || countr == 48 || countr == 54 || countr == 62 || countr == 68 || countr == 74 || countr == 81 || countr == 96 || countr == 102 || countr == 108 || countr == 115 || countr == 121 || countr == 131 || countr == 137 || countr == 143) {
                    rows1 += '<th rowspan="6">' + html + '</th>'
                } else if (countr == 87) {
                    rows1 += '<th rowspan="5">' + html + '</th>'
                } else if (countr == 31 || countr == 127 || countr == 92) {
                    rows1 += '<th rowspan="4">' + html + '</th>'
                } else if (countr == 60) {
                    rows1 += '<th rowspan="2">' + html + '</th>'
                } else {
                    rows1 += '<th>' + html + '</th>'
                }
                // console.log(html);
            }
            for (var ee of ttb) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<td>' + html + '</td>'
                // console.log(html);
            }
            rows1 += '</tr>';
            countr++;
        }


        //─────────────────────────────────────────────────────────────────────ここまでスクレイピング
        //------------------------------------------------------------------データの受け渡しへ
        var data = {
            year: y,
            content: rows1,
        };
        res.render('baseball/m4', data);
    })();
});










router.get('/m5', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────5月年間日程表
    var today = new Date();//───────────────────────変数を書く場所
    var y = today.getFullYear();
    var rows1 = '';
    var countr = 0;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/games/2023/schedule_05_detail.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // const t = await page.$('.table_normal> table > thead > tr > .date');
        // const tt = await page.evaluate(body => body.innerHTML, t);
        // console.log(tt);


        //thead取得部分
        const t = await page.$$('.table_normal> table > thead > tr');
        for (var e of t) {
            const tt = await e.$$('th');
            rows1 += '<tr>';
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<th>' + html + '</th>'
                // console.log(html);
            }
            rows1 += '</tr>';
        }
        //tbody取得部分
        const tb = await page.$$('.table_normal> table > tbody > tr');
        for (var e of tb) {
            const tth = await e.$$('th');
            const ttb = await e.$$('td');
            rows1 += '<tr>';
            for (var ee of tth) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                if (countr == 1 || countr == 7 || countr == 13 || countr == 19 || countr == 25 || countr == 31 || countr == 38 || countr == 49 || countr == 60 || countr == 66 || countr == 73 || countr == 79 || countr == 95 || countr == 101 || countr == 108 || countr == 114 || countr == 129 || countr == 135 || countr == 142 || countr == 148) {
                    rows1 += '<th rowspan="6">' + html + '</th>'
                } else if (countr == 44 || countr == 55 || countr == 85 || countr == 90 || countr == 124) {
                    rows1 += '<th rowspan="5">' + html + '</th>'
                } else if (countr == 120) {
                    rows1 += '<th rowspan="4">' + html + '</th>'
                } else {
                    rows1 += '<th>' + html + '</th>'
                }
                // console.log(html);
            }
            for (var ee of ttb) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<td>' + html + '</td>'
                // console.log(html);
            }
            rows1 += '</tr>';
            countr++;
        }


        //─────────────────────────────────────────────────────────────────────ここまでスクレイピング
        //------------------------------------------------------------------データの受け渡しへ
        var data = {
            year: y,
            content: rows1,
        };
        res.render('baseball/m5', data);
    })();
});











router.get('/m6', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────6月
    var today = new Date();//───────────────────────変数を書く場所
    var y = today.getFullYear();
    var rows1 = '';
    countr = 0;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/games/2023/schedule_06_detail.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // const t = await page.$('.table_normal> table > thead > tr > .date');
        // const tt = await page.evaluate(body => body.innerHTML, t);
        // console.log(tt);


        //thead取得部分
        const t = await page.$$('.table_normal> table > thead > tr');
        for (var e of t) {
            const tt = await e.$$('th');
            rows1 += '<tr>';
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<th>' + html + '</th>'
                // console.log(html);
            }
            rows1 += '</tr>';
        }
        //tbody取得部分
        const tb = await page.$$('.table_normal> table > tbody > tr');
        for (var e of tb) {
            const tth = await e.$$('th');
            const ttb = await e.$$('td');
            rows1 += '<tr>';
            for (var ee of tth) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                if (countr == 0 || countr == 6 || countr == 12 || countr == 18 || countr == 26 || countr == 32 || countr == 38 || countr == 44 || countr == 50 || countr == 56 || countr == 63 || countr == 69 || countr == 75 || countr == 81 || countr == 87 || countr == 93 || countr == 103 || countr == 109 || countr == 115 || countr == 127 || countr == 136) {
                    rows1 += '<th rowspan="6">' + html + '</th>'
                } else if (countr == 122) {
                    rows1 += '<th rowspan="5">' + html + '</th>'
                } else if (countr == 133) {
                    rows1 += '<th rowspan="3">' + html + '</th>'
                } else if (countr == 24) {
                    rows1 += '<th rowspan="2">' + html + '</th>'
                } else {
                    rows1 += '<th>' + html + '</th>'
                }
                // console.log(html);
            }
            for (var ee of ttb) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<td>' + html + '</td>'
                // console.log(html);
            }
            rows1 += '</tr>';
            countr++;
        }


        //─────────────────────────────────────────────────────────────────────ここまでスクレイピング
        //------------------------------------------------------------------データの受け渡しへ
        var data = {
            year: y,
            content: rows1,
        };
        res.render('baseball/m6', data);
    })();
});














router.get('/m7', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────7月
    var today = new Date();//───────────────────────変数を書く場所
    var y = today.getFullYear();
    var rows1 = '';
    var countr = 0;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/games/2023/schedule_07_detail.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // const t = await page.$('.table_normal> table > thead > tr > .date');
        // const tt = await page.evaluate(body => body.innerHTML, t);
        // console.log(tt);


        //thead取得部分
        const t = await page.$$('.table_normal> table > thead > tr');
        for (var e of t) {
            const tt = await e.$$('th');
            rows1 += '<tr>';
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<th>' + html + '</th>'
                // console.log(html);
            }
            rows1 += '</tr>';
        }
        //tbody取得部分
        const tb = await page.$$('.table_normal> table > tbody > tr');
        for (var e of tb) {
            const tth = await e.$$('th');
            const ttb = await e.$$('td');
            rows1 += '<tr>';
            for (var ee of tth) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                if (countr == 0 || countr == 6 || countr == 13 || countr == 19 || countr == 34 || countr == 40 || countr == 52 || countr == 58 || countr == 65 || countr == 71 || countr == 77 || countr == 87 || countr == 93 || countr == 100 || countr == 106 || countr == 116 || countr == 122 || countr == 128) {
                    rows1 += '<th rowspan="6">' + html + '</th>'
                } else if (countr == 25 || countr == 47) {
                    rows1 += '<th rowspan="5">' + html + '</th>'
                } else if (countr == 30 || countr == 112) {
                    rows1 += '<th rowspan="4">' + html + '</th>'
                } else {
                    rows1 += '<th>' + html + '</th>'
                }
                // console.log(html);
            }
            for (var ee of ttb) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<td>' + html + '</td>'
                // console.log(html);
            }
            rows1 += '</tr>';
            countr++;
        }


        //─────────────────────────────────────────────────────────────────────ここまでスクレイピング
        //------------------------------------------------------------------データの受け渡しへ
        var data = {
            year: y,
            content: rows1,
        };
        res.render('baseball/m7', data);
    })();
});



















router.get('/m8', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────8月
    var today = new Date();//───────────────────────変数を書く場所
    var y = today.getFullYear();
    var rows1 = '';
    var countr = 0;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/games/2023/schedule_08_detail.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // const t = await page.$('.table_normal> table > thead > tr > .date');
        // const tt = await page.evaluate(body => body.innerHTML, t);
        // console.log(tt);


        //thead取得部分
        const t = await page.$$('.table_normal> table > thead > tr');
        for (var e of t) {
            const tt = await e.$$('th');
            rows1 += '<tr>';
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<th>' + html + '</th>'
                // console.log(html);
            }
            rows1 += '</tr>';
        }
        //tbody取得部分
        const tb = await page.$$('.table_normal> table > tbody > tr');
        for (var e of tb) {
            const tth = await e.$$('th');
            const ttb = await e.$$('td');
            rows1 += '<tr>';
            for (var ee of tth) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                if (countr == 0 || countr == 6 || countr == 17 || countr == 23 || countr == 29 || countr == 36 || countr == 42 || countr == 48 || countr == 54 || countr == 60 || countr == 66 || countr == 73 || countr == 79 || countr == 85 || countr == 91 || countr == 97 || countr == 103 || countr == 110 || countr == 116 || countr == 126 || countr == 132 || countr == 138 || countr == 145 || countr == 151 || countr == 157) {
                    rows1 += '<th rowspan="6">' + html + '</th>'
                } else if (countr == 12) {
                    rows1 += '<th rowspan="5">' + html + '</th>'
                } else if (countr == 122) {
                    rows1 += '<th rowspan="4">' + html + '</th>'
                } else {
                    rows1 += '<th>' + html + '</th>'
                }

                // console.log(html);
            }
            for (var ee of ttb) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<td>' + html + '</td>'
                // console.log(html);
            }
            rows1 += '</tr>';
            countr++;
        }


        //─────────────────────────────────────────────────────────────────────ここまでスクレイピング
        //------------------------------------------------------------------データの受け渡しへ
        var data = {
            year: y,
            content: rows1,
        };
        res.render('baseball/m8', data);
    })();
});














router.get('/m9', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────9月
    var today = new Date();//───────────────────────変数を書く場所
    var y = today.getFullYear();
    var rows1 = '';
    var countr = 0;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/games/2023/schedule_09_detail.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // const t = await page.$('.table_normal> table > thead > tr > .date');
        // const tt = await page.evaluate(body => body.innerHTML, t);
        // console.log(tt);


        //thead取得部分
        const t = await page.$$('.table_normal> table > thead > tr');
        for (var e of t) {
            const tt = await e.$$('th');
            rows1 += '<tr>';
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<th>' + html + '</th>'
                // console.log(html);
            }
            rows1 += '</tr>';
        }
        //tbody取得部分
        const tb = await page.$$('.table_normal> table > tbody > tr');
        for (var e of tb) {
            const tth = await e.$$('th');
            const ttb = await e.$$('td');
            rows1 += '<tr>';
            for (var ee of tth) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                if (countr == 0 || countr == 6 || countr == 12 || countr == 19 || countr == 25 || countr == 34 || countr == 40 || countr == 46 || countr == 53 || countr == 59 || countr == 71 || countr == 77 || countr == 83 || countr == 92 || countr == 106 || countr == 112 || countr == 118) {
                    rows1 += '<th rowspan="6">' + html + '</th>'
                } else if (countr == 98) {
                    rows1 += '<th rowspan="5">' + html + '</th>'
                } else if (countr == 124 || countr == 128) {
                    rows1 += '<th rowspan="4">' + html + '</th>'
                } else if (countr == 31 || countr == 65 || countr == 68 || countr == 89 || countr == 103 || countr == 135) {
                    rows1 += '<th rowspan="3">' + html + '</th>'
                } else if (countr == 132) {
                    rows1 += '<th rowspan="2">' + html + '</th>'
                } else {
                    rows1 += '<th>' + html + '</th>'
                }
                // console.log(html);
            }
            for (var ee of ttb) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<td>' + html + '</td>'
                // console.log(html);
            }
            rows1 += '</tr>';
            countr++;
        }


        //─────────────────────────────────────────────────────────────────────ここまでスクレイピング
        //------------------------------------------------------------------データの受け渡しへ
        var data = {
            year: y,
            content: rows1,
        };
        res.render('baseball/m9', data);
    })();
});













router.get('/m10', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────10月
    var today = new Date();//───────────────────────変数を書く場所
    var y = today.getFullYear();
    var rows1 = '';
    var countr = 0;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/games/2023/schedule_10_detail.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // const t = await page.$('.table_normal> table > thead > tr > .date');
        // const tt = await page.evaluate(body => body.innerHTML, t);
        // console.log(tt);


        //thead取得部分
        const t = await page.$$('.table_normal> table > thead > tr');
        for (var e of t) {
            const tt = await e.$$('th');
            rows1 += '<tr>';
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<th>' + html + '</th>'
                // console.log(html);
            }
            rows1 += '</tr>';
        }
        //tbody取得部分
        const tb = await page.$$('.table_normal> table > tbody > tr');
        for (var e of tb) {
            const tth = await e.$$('th');
            const ttb = await e.$$('td');
            rows1 += '<tr>';
            for (var ee of tth) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                if (countr == 0) {
                    rows1 += '<th rowspan="3">' + html + '</th>'
                } else if (countr == 3 || countr > 15 && countr < 40 && countr % 2 == 0) {
                    rows1 += '<th rowspan="2">' + html + '</th>'
                } else {
                    rows1 += '<th>' + html + '</th>'
                }
                // console.log(html);
            }
            for (var ee of ttb) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<td>' + html + '</td>'
                // console.log(html);
            }
            rows1 += '</tr>';
            countr++;
            // console.log(countr);
        }


        //─────────────────────────────────────────────────────────────────────ここまでスクレイピング
        //------------------------------------------------------------------データの受け渡しへ
        var data = {
            year: y,
            content: rows1,
        };
        res.render('baseball/m10', data);
    })();
});














router.get('/m11', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────11月
    var today = new Date();//───────────────────────変数を書く場所
    var y = today.getFullYear();
    var rows1 = '';
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/games/2023/schedule_11_detail.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // const t = await page.$('.table_normal> table > thead > tr > .date');
        // const tt = await page.evaluate(body => body.innerHTML, t);
        // console.log(tt);


        //thead取得部分
        const t = await page.$$('.table_normal> table > thead > tr');
        for (var e of t) {
            const tt = await e.$$('th');
            rows1 += '<tr>';
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<th>' + html + '</th>'
                // console.log(html);
            }
            rows1 += '</tr>';
        }
        //tbody取得部分
        const tb = await page.$$('.table_normal> table > tbody > tr');
        for (var e of tb) {
            const tth = await e.$$('th');
            const ttb = await e.$$('td');
            rows1 += '<tr>';
            for (var ee of tth) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<th>' + html + '</th>'
                // console.log(html);
            }
            for (var ee of ttb) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                rows1 += '<td>' + html + '</td>'
                // console.log(html);
            }
            rows1 += '</tr>';
        }


        //─────────────────────────────────────────────────────────────────────ここまでスクレイピング
        //------------------------------------------------------------------データの受け渡しへ
        var data = {
            year: y,
            content: rows1,
        };
        res.render('baseball/m11', data);
    })();
});









module.exports = router;