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
    var y = today.getFullYear();
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
    var counts = 1;
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
            } else if (counttd > 61 && counttd < 75) {
                td5 += '<tr>'
            } else if (counttd > 75 && counttd < 80) {
                td6 += '<tr>'
            } else if (counttd == 81) {
                td7 += '<tr>'
            }
            counts = 1;
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>'
                } else if (counttd > 3 && counttd < 37) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 37 && counttd < 45) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 45 && counttd < 61) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 61 && counttd < 75) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 75 && counttd < 80) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd == 81) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                counts++;
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
            } else if (counttd > 61 && counttd < 75) {
                td5 += '</tr>'
            } else if (counttd > 75 && counttd < 80) {
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
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/hanshin', data);
    })();

});

router.get('/pithanshin', function (req, res, next) {//阪神投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_t.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pithanshin', data);
    })();

});

router.get('/bathanshin', function (req, res, next) {//阪神打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_t.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/bathanshin', data);
    })();

});



router.get('/yakuruto', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────ヤクルト選手一覧
    var today = new Date();
    var y = today.getFullYear();
    var countth = 1;
    var counttd = 1;

    var th1 = '';
    var th2 = '';
    var th3 = '';
    var th4 = '';
    var th5 = '';
    var th6 = '';
    var th7 = '';
    var th8 = '';

    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';
    var td5 = '';
    var td6 = '';
    var td7 = '';
    var td8 = '';


    var rows = '';
    var rows2 = '';

    var htmli = '';
    var counts = 1;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_s.html';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // const datas = await page.$$eval('a', list => list.map(item => item.href));
        // console.log(datas);

        //thead取得部分
        const t = await page.$$('.rosterdivlisttbl > table > tbody > tr');
        th1 += '<tr>';
        th2 += '<tr>';
        th3 += '<tr>';
        th4 += '<tr>';
        th5 += '<tr>';
        th6 += '<tr>';
        th7 += '<tr>';
        th8 += '<tr>';
        for (var e of t) {
            const tt = await e.$$('th');
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (countth == 1) {
                    th1 += '<th>' + html + '</th>';
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>';
                } else if (countth == 40) {
                    th3 += '<th>' + html + '</th>';
                } else if (countth == 46) {
                    th4 += '<th>' + html + '</th>';
                } else if (countth == 65) {
                    th5 += '<th>' + html + '</th>';
                } else if (countth == 74) {
                    th6 += '<th>' + html + '</th>';
                } else if (countth == 80) {
                    th7 += '<th>' + html + '</th>';
                } else if (countth == 83) {
                    th8 += '<th>' + html + '</th>';
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
        th8 += '</tr>';

        for (var e of t) {
            const tt = await e.$$('td');
            if (counttd == 2) {
                td1 += '<tr>';
            } else if (counttd > 3 && counttd < 40) {
                td2 += '<tr>';
            } else if (counttd > 40 && counttd < 46) {
                td3 += '<tr>';
            } else if (counttd > 46 && counttd < 65) {
                td4 += '<tr>';
            } else if (counttd > 65 && counttd < 74) {
                td5 += '<tr>';
            } else if (counttd > 74 && counttd < 80) {
                td6 += '<tr>';
            } else if (counttd > 80 && counttd < 83) {
                td7 += '<tr>';
            } else if (counttd == 84) {
                td8 += '<tr>';
            }
            counts = 1;
            for (var ee of tt) {
                // const href = await ee.$('a', (ee) => ee.href);
                const html = await page.evaluate(body => body.innerHTML, ee);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>';
                } else if (counttd > 3 && counttd < 40) {
                    if (counts == 2) {//start
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                            // console.log(counts);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                        // console.log(counts);
                    }//finish
                } else if (counttd > 40 && counttd < 46) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 46 && counttd < 65) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 65 && counttd < 74) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 74 && counttd < 80) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 80 && counttd < 83) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd == 84) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td8 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td8 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                // console.log(counts);
                counts++;
            }
            // console.log(countth);
            if (counttd == 2) {
                td1 += '</tr>';
            } else if (counttd > 3 && counttd < 40) {
                td2 += '</tr>';
            } else if (counttd > 40 && counttd < 46) {
                td3 += '</tr>';
            } else if (counttd > 46 && counttd < 65) {
                td4 += '</tr>';
            } else if (counttd > 65 && counttd < 74) {
                td5 += '</tr>';
            } else if (counttd > 74 && counttd < 80) {
                td6 += '</tr>';
            } else if (counttd > 80 && counttd < 83) {
                td7 += '</tr>';
            } else if (counttd == 84) {
                td8 += '</tr>';
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
        rows2 += th8;
        rows2 += td8;

        //------------------------------------------------------------------データの受け渡しへ
        data = {
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/yakuruto', data);
    })();

});

router.get('/pityakuruto', function (req, res, next) {//ヤクルト投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_s.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pityakuruto', data);
    })();

});

router.get('/batyakuruto', function (req, res, next) {//ヤクルト打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_s.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/batyakuruto', data);
    })();

});

router.get('/yokohama', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────横浜選手一覧
    var today = new Date();
    var y = today.getFullYear();
    var countth = 1;
    var counttd = 1;

    var th1 = '';
    var th2 = '';
    var th3 = '';
    var th4 = '';
    var th5 = '';
    var th6 = '';
    var th7 = '';
    var th8 = '';
    var th9 = '';

    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';
    var td5 = '';
    var td6 = '';
    var td7 = '';
    var td8 = '';
    var td9 = '';


    var rows = '';
    var rows2 = '';
    var counts = 1;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_db.html';
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
        th8 += '<tr>';
        th9 += '<tr>';
        for (var e of t) {
            const tt = await e.$$('th');
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (countth == 1) {
                    th1 += '<th>' + html + '</th>';
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>';
                } else if (countth == 41) {
                    th3 += '<th>' + html + '</th>';
                } else if (countth == 48) {
                    th4 += '<th>' + html + '</th>';
                } else if (countth == 63) {
                    th5 += '<th>' + html + '</th>';
                } else if (countth == 74) {
                    th6 += '<th>' + html + '</th>';
                } else if (countth == 82) {
                    th7 += '<th>' + html + '</th>';
                } else if (countth == 85) {
                    th8 += '<th>' + html + '</th>';
                } else if (countth == 87) {
                    th9 += '<th>' + html + '</th>';
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
        th8 += '</tr>';
        th9 += '</tr>';

        for (var e of t) {
            const tt = await e.$$('td');
            if (counttd == 2) {
                td1 += '<tr>';
            } else if (counttd > 3 && counttd < 41) {
                td2 += '<tr>';
            } else if (counttd > 41 && counttd < 48) {
                td3 += '<tr>';
            } else if (counttd > 48 && counttd < 63) {
                td4 += '<tr>';
            } else if (counttd > 63 && counttd < 74) {
                td5 += '<tr>';
            } else if (counttd > 74 && counttd < 82) {
                td6 += '<tr>';
            } else if (counttd > 82 && counttd < 85) {
                td7 += '<tr>';
            } else if (counttd == 86) {
                td8 += '<tr>';
            } else if (counttd > 87 && counttd < 91) {
                td9 += '<tr>';
            }
            counts = 1;
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>';
                } else if (counttd > 3 && counttd < 41) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                    // td2 += '<td>' + html + '</td>';
                } else if (counttd > 41 && counttd < 48) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 48 && counttd < 63) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 63 && counttd < 74) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 74 && counttd < 82) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 82 && counttd < 85) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd == 86) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td8 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td8 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 87 && counttd < 91) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td9 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td9 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                counts++;
            }
            // console.log(countth);
            if (counttd == 2) {
                td1 += '</tr>';
            } else if (counttd > 3 && counttd < 41) {
                td2 += '</tr>';
            } else if (counttd > 41 && counttd < 48) {
                td3 += '</tr>';
            } else if (counttd > 48 && counttd < 63) {
                td4 += '</tr>';
            } else if (counttd > 63 && counttd < 74) {
                td5 += '</tr>';
            } else if (counttd > 74 && counttd < 82) {
                td6 += '</tr>';
            } else if (counttd > 82 && counttd < 85) {
                td7 += '</tr>';
            } else if (counttd == 86) {
                td8 += '</tr>';
            } else if (counttd > 87 && counttd < 91) {
                td9 += '</tr>';
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
        rows2 += th8;
        rows2 += td8;
        rows2 += th9;
        rows2 += td9;


        //------------------------------------------------------------------データの受け渡しへ
        data = {
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/yokohama', data);
    })();

});


router.get('/pityokohama', function (req, res, next) {//横浜投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_db.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pityokohama', data);
    })();

});

router.get('/batyokohama', function (req, res, next) {//横浜打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_db.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/batyokohama', data);
    })();

});


router.get('/kyozin', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────巨人選手一覧
    var today = new Date();
    var y = today.getFullYear();
    var countth = 1;
    var counttd = 1;

    var th1 = '';
    var th2 = '';
    var th3 = '';
    var th4 = '';
    var th5 = '';
    var th6 = '';
    var th7 = '';
    var th8 = '';
    var th9 = '';

    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';
    var td5 = '';
    var td6 = '';
    var td7 = '';
    var td8 = '';
    var td9 = '';


    var rows = '';
    var rows2 = '';
    var counts = 1;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_g.html';
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
        th8 += '<tr>';
        th9 += '<tr>';
        for (var e of t) {
            const tt = await e.$$('th');
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (countth == 1) {
                    th1 += '<th>' + html + '</th>';
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>';
                } else if (countth == 37) {
                    th3 += '<th>' + html + '</th>';
                } else if (countth == 43) {
                    th4 += '<th>' + html + '</th>';
                } else if (countth == 61) {
                    th5 += '<th>' + html + '</th>';
                } else if (countth == 74) {
                    th6 += '<th>' + html + '</th>';
                } else if (countth == 96) {
                    th7 += '<th>' + html + '</th>';
                } else if (countth == 102) {
                    th8 += '<th>' + html + '</th>';
                } else if (countth == 109) {
                    th9 += '<th>' + html + '</th>';
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
        th8 += '</tr>';
        th9 += '</tr>';

        for (var e of t) {
            const tt = await e.$$('td');
            if (counttd == 2) {
                td1 += '<tr>';
            } else if (counttd > 3 && counttd < 37) {
                td2 += '<tr>';
            } else if (counttd > 37 && counttd < 43) {
                td3 += '<tr>';
            } else if (counttd > 43 && counttd < 61) {
                td4 += '<tr>';
            } else if (counttd > 61 && counttd < 74) {
                td5 += '<tr>';
            } else if (counttd > 74 && counttd < 96) {
                td6 += '<tr>';
            } else if (counttd > 96 && counttd < 102) {
                td7 += '<tr>';
            } else if (counttd > 102 && counttd < 109) {
                td8 += '<tr>';
            } else if (counttd > 109 && counttd < 117) {
                td9 += '<tr>';
            }
            counts = 1;
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>';
                } else if (counttd > 3 && counttd < 37) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 37 && counttd < 43) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 43 && counttd < 61) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 61 && counttd < 74) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 74 && counttd < 96) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 96 && counttd < 102) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 102 && counttd < 109) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td8 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td8 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 109 && counttd < 117) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td9 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td9 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                counts++;
            }
            if (counttd == 2) {
                td1 += '</tr>';
            } else if (counttd > 3 && counttd < 37) {
                td2 += '</tr>';
            } else if (counttd > 37 && counttd < 43) {
                td3 += '</tr>';
            } else if (counttd > 43 && counttd < 61) {
                td4 += '</tr>';
            } else if (counttd > 61 && counttd < 74) {
                td5 += '</tr>';
            } else if (counttd > 74 && counttd < 96) {
                td6 += '</tr>';
            } else if (counttd > 96 && counttd < 102) {
                td7 += '</tr>';
            } else if (counttd > 102 && counttd < 109) {
                td8 += '</tr>';
            } else if (counttd > 109 && counttd < 117) {
                td9 += '</tr>';
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
        rows2 += th8;
        rows2 += td8;
        rows2 += th9;
        rows2 += td9;


        //------------------------------------------------------------------データの受け渡しへ
        data = {
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/kyozin', data);
    })();

});


router.get('/pitkyozin', function (req, res, next) {//巨人投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_g.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pitkyozin', data);
    })();

});

router.get('/batkyozin', function (req, res, next) {//巨人打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_g.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/batkyozin', data);
    })();

});




router.get('/hirosima', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────広島選手一覧
    var today = new Date();
    var y = today.getFullYear();
    var countth = 1;
    var counttd = 1;

    var th1 = '';
    var th2 = '';
    var th3 = '';
    var th4 = '';
    var th5 = '';
    var th6 = '';
    var th7 = '';
    var th8 = '';

    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';
    var td5 = '';
    var td6 = '';
    var td7 = '';
    var td8 = '';


    var rows = '';
    var rows2 = '';
    counts = 1;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_c.html';
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
        th8 += '<tr>';
        for (var e of t) {
            const tt = await e.$$('th');
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (countth == 1) {
                    th1 += '<th>' + html + '</th>';
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>';
                } else if (countth == 38) {
                    th3 += '<th>' + html + '</th>';
                } else if (countth == 47) {
                    th4 += '<th>' + html + '</th>';
                } else if (countth == 63) {
                    th5 += '<th>' + html + '</th>';
                } else if (countth == 75) {
                    th6 += '<th>' + html + '</th>';
                } else if (countth == 81) {
                    th7 += '<th>' + html + '</th>';
                } else if (countth == 83) {
                    th8 += '<th>' + html + '</th>';
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
        th8 += '</tr>';

        for (var e of t) {
            const tt = await e.$$('td');
            if (counttd == 2) {
                td1 += '<tr>';
            } else if (counttd > 3 && counttd < 38) {
                td2 += '<tr>';
            } else if (counttd > 38 && counttd < 47) {
                td3 += '<tr>';
            } else if (counttd > 47 && counttd < 63) {
                td4 += '<tr>';
            } else if (counttd > 63 && counttd < 75) {
                td5 += '<tr>';
            } else if (counttd > 75 && counttd < 81) {
                td6 += '<tr>';
            } else if (counttd > 81 && counttd < 83) {
                td7 += '<tr>';
            } else if (counttd > 83 && counttd < 86) {
                td8 += '<tr>';
            }
            counts = 1;
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>';
                } else if (counttd > 3 && counttd < 38) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 38 && counttd < 47) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 47 && counttd < 63) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 63 && counttd < 75) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 75 && counttd < 81) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 81 && counttd < 83) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 83 && counttd < 86) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td8 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td8 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                counts++;
            }
            // console.log(countth);
            if (counttd == 2) {
                td1 += '</tr>';
            } else if (counttd > 3 && counttd < 38) {
                td2 += '</tr>';
            } else if (counttd > 38 && counttd < 47) {
                td3 += '</tr>';
            } else if (counttd > 47 && counttd < 63) {
                td4 += '</tr>';
            } else if (counttd > 63 && counttd < 75) {
                td5 += '</tr>';
            } else if (counttd > 75 && counttd < 81) {
                td6 += '</tr>';
            } else if (counttd > 81 && counttd < 83) {
                td7 += '</tr>';
            } else if (counttd > 83 && counttd < 86) {
                td8 += '</tr>';
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
        rows2 += th8;
        rows2 += td8;


        //------------------------------------------------------------------データの受け渡しへ
        data = {
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/hirosima', data);
    })();

});


router.get('/pithirosima', function (req, res, next) {//広島投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_c.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pithirosima', data);
    })();

});

router.get('/bathirosima', function (req, res, next) {//広島打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_c.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/bathirosima', data);
    })();

});





router.get('/tyuniti', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────中日選手一覧
    var today = new Date();
    var y = today.getFullYear();
    var countth = 1;
    var counttd = 1;

    var th1 = '';
    var th2 = '';
    var th3 = '';
    var th4 = '';
    var th5 = '';
    var th6 = '';
    var th7 = '';
    var th8 = '';

    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';
    var td5 = '';
    var td6 = '';
    var td7 = '';
    var td8 = '';


    var rows = '';
    var rows2 = '';
    var counts = 1;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_d.html';
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
        th8 += '<tr>';
        for (var e of t) {
            const tt = await e.$$('th');
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (countth == 1) {
                    th1 += '<th>' + html + '</th>';
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>';
                } else if (countth == 35) {
                    th3 += '<th>' + html + '</th>';
                } else if (countth == 43) {
                    th4 += '<th>' + html + '</th>';
                } else if (countth == 59) {
                    th5 += '<th>' + html + '</th>';
                } else if (countth == 72) {
                    th6 += '<th>' + html + '</th>';
                } else if (countth == 83) {
                    th7 += '<th>' + html + '</th>';
                } else if (countth == 86) {
                    th8 += '<th>' + html + '</th>';
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
        th8 += '</tr>';

        for (var e of t) {
            const tt = await e.$$('td');
            if (counttd == 2) {
                td1 += '<tr>';
            } else if (counttd > 3 && counttd < 35) {
                td2 += '<tr>';
            } else if (counttd > 35 && counttd < 43) {
                td3 += '<tr>';
            } else if (counttd > 43 && counttd < 59) {
                td4 += '<tr>';
            } else if (counttd > 59 && counttd < 72) {
                td5 += '<tr>';
            } else if (counttd > 72 && counttd < 83) {
                td6 += '<tr>';
            } else if (counttd > 83 && counttd < 86) {
                td7 += '<tr>';
            } else if (counttd == 87) {
                td8 += '<tr>';
            }
            counts = 1;
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>';
                } else if (counttd > 3 && counttd < 35) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 35 && counttd < 43) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 43 && counttd < 59) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 59 && counttd < 72) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 72 && counttd < 83) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 83 && counttd < 86) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd == 87) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td8 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td8 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                counts++;
            }
            // console.log(countth);
            if (counttd == 2) {
                td1 += '</tr>';
            } else if (counttd > 3 && counttd < 35) {
                td2 += '</tr>';
            } else if (counttd > 35 && counttd < 43) {
                td3 += '</tr>';
            } else if (counttd > 43 && counttd < 59) {
                td4 += '</tr>';
            } else if (counttd > 59 && counttd < 72) {
                td5 += '</tr>';
            } else if (counttd > 72 && counttd < 83) {
                td6 += '</tr>';
            } else if (counttd > 83 && counttd < 86) {
                td7 += '</tr>';
            } else if (counttd == 87) {
                td8 += '</tr>';
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
        rows2 += th8;
        rows2 += td8;


        //------------------------------------------------------------------データの受け渡しへ
        data = {
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/tyuniti', data);
    })();

});



router.get('/pittyuniti', function (req, res, next) {//中日投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_d.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pittyuniti', data);
    })();

});

router.get('/battyuniti', function (req, res, next) {//中日打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_d.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/battyuniti', data);
    })();

});







router.get('/orix', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────オリックス選手一覧
    var today = new Date();
    var y = today.getFullYear();
    var countth = 1;
    var counttd = 1;

    var th1 = '';
    var th2 = '';
    var th3 = '';
    var th4 = '';
    var th5 = '';
    var th6 = '';
    var th7 = '';
    var th8 = '';
    var th9 = '';

    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';
    var td5 = '';
    var td6 = '';
    var td7 = '';
    var td8 = '';
    var td9 = '';


    var rows = '';
    var rows2 = '';
    var counts = 1;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_b.html';
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
        th8 += '<tr>';
        th9 += '<tr>';
        for (var e of t) {
            const tt = await e.$$('th');
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (countth == 1) {
                    th1 += '<th>' + html + '</th>';
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>';
                } else if (countth == 35) {
                    th3 += '<th>' + html + '</th>';
                } else if (countth == 42) {
                    th4 += '<th>' + html + '</th>';
                } else if (countth == 60) {
                    th5 += '<th>' + html + '</th>';
                } else if (countth == 74) {
                    th6 += '<th>' + html + '</th>';
                } else if (countth == 85) {
                    th7 += '<th>' + html + '</th>';
                } else if (countth == 88) {
                    th8 += '<th>' + html + '</th>';
                } else if (countth == 91) {
                    th9 += '<th>' + html + '</th>';
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
        th8 += '</tr>';
        th9 += '</tr>';

        for (var e of t) {
            const tt = await e.$$('td');
            if (counttd == 2) {
                td1 += '<tr>';
            } else if (counttd > 3 && counttd < 35) {
                td2 += '<tr>';
            } else if (counttd > 35 && counttd < 42) {
                td3 += '<tr>';
            } else if (counttd > 42 && counttd < 61) {
                td4 += '<tr>';
            } else if (counttd > 60 && counttd < 74) {
                td5 += '<tr>';
            } else if (counttd > 74 && counttd < 85) {
                td6 += '<tr>';
            } else if (counttd > 85 && counttd < 88) {
                td7 += '<tr>';
            } else if (counttd > 88 && counttd < 91) {
                td8 += '<tr>';
            } else if (counttd > 91 && counttd < 94) {
                td9 += '<tr>';
            }
            counts = 1;
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>';
                } else if (counttd > 3 && counttd < 35) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 35 && counttd < 42) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 42 && counttd < 60) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 60 && counttd < 74) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 74 && counttd < 85) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 85 && counttd < 88) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 88 && counttd < 91) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td8 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td8 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 91 && counttd < 94) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td9 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td9 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                counts++;
            }
            if (counttd == 2) {
                td1 += '</tr>';
            } else if (counttd > 3 && counttd < 35) {
                td2 += '</tr>';
            } else if (counttd > 35 && counttd < 42) {
                td3 += '</tr>';
            } else if (counttd > 42 && counttd < 60) {
                td4 += '</tr>';
            } else if (counttd > 60 && counttd < 74) {
                td5 += '</tr>';
            } else if (counttd > 74 && counttd < 85) {
                td6 += '</tr>';
            } else if (counttd > 85 && counttd < 88) {
                td7 += '</tr>';
            } else if (counttd > 88 && counttd < 91) {
                td8 += '</tr>';
            } else if (counttd > 91 && counttd < 94) {
                td9 += '</tr>';
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
        rows2 += th8;
        rows2 += td8;
        rows2 += th9;
        rows2 += td9;


        //------------------------------------------------------------------データの受け渡しへ
        data = {
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/orix', data);
    })();

});




router.get('/pitorix', function (req, res, next) {//オリックス投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_b.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pitorix', data);
    })();

});

router.get('/batorix', function (req, res, next) {//オリックス打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_b.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/batorix', data);
    })();

});








router.get('/softbank', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────ソフトバンク選手一覧
    var today = new Date();
    var y = today.getFullYear();
    var countth = 1;
    var counttd = 1;

    var th1 = '';
    var th2 = '';
    var th3 = '';
    var th4 = '';
    var th5 = '';
    var th6 = '';
    var th7 = '';
    var th8 = '';
    var th9 = '';

    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';
    var td5 = '';
    var td6 = '';
    var td7 = '';
    var td8 = '';
    var td9 = '';


    var rows = '';
    var rows2 = '';
    var counts = 1;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_h.html';
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
        th8 += '<tr>';
        th9 += '<tr>';
        for (var e of t) {
            const tt = await e.$$('th');
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (countth == 1) {
                    th1 += '<th>' + html + '</th>';
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>';
                } else if (countth == 37) {
                    th3 += '<th>' + html + '</th>';
                } else if (countth == 46) {
                    th4 += '<th>' + html + '</th>';
                } else if (countth == 61) {
                    th5 += '<th>' + html + '</th>';
                } else if (countth == 74) {
                    th6 += '<th>' + html + '</th>';
                } else if (countth == 105) {
                    th7 += '<th>' + html + '</th>';
                } else if (countth == 110) {
                    th8 += '<th>' + html + '</th>';
                } else if (countth == 121) {
                    th9 += '<th>' + html + '</th>';
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
        th8 += '</tr>';
        th9 += '</tr>';

        for (var e of t) {
            const tt = await e.$$('td');
            if (counttd == 2) {
                td1 += '<tr>';
            } else if (counttd > 3 && counttd < 37) {
                td2 += '<tr>';
            } else if (counttd > 37 && counttd < 46) {
                td3 += '<tr>';
            } else if (counttd > 46 && counttd < 61) {
                td4 += '<tr>';
            } else if (counttd > 61 && counttd < 74) {
                td5 += '<tr>';
            } else if (counttd > 74 && counttd < 105) {
                td6 += '<tr>';
            } else if (counttd > 105 && counttd < 110) {
                td7 += '<tr>';
            } else if (counttd > 110 && counttd < 121) {
                td8 += '<tr>';
            } else if (counttd > 121 && counttd < 132) {
                td9 += '<tr>';
            }
            counts = 1;
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>';
                } else if (counttd > 3 && counttd < 37) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 37 && counttd < 46) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 46 && counttd < 61) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 61 && counttd < 74) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 74 && counttd < 105) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 105 && counttd < 110) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 110 && counttd < 121) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td8 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td8 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 121 && counttd < 132) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td9 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td9 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                counts++;
            }
            if (counttd == 2) {
                td1 += '</tr>';
            } else if (counttd > 3 && counttd < 37) {
                td2 += '</tr>';
            } else if (counttd > 37 && counttd < 46) {
                td3 += '</tr>';
            } else if (counttd > 46 && counttd < 61) {
                td4 += '</tr>';
            } else if (counttd > 61 && counttd < 74) {
                td5 += '</tr>';
            } else if (counttd > 74 && counttd < 105) {
                td6 += '</tr>';
            } else if (counttd > 105 && counttd < 110) {
                td7 += '</tr>';
            } else if (counttd > 110 && counttd < 121) {
                td8 += '</tr>';
            } else if (counttd > 121 && counttd < 132) {
                td9 += '</tr>';
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
        rows2 += th8;
        rows2 += td8;
        rows2 += th9;
        rows2 += td9;


        //------------------------------------------------------------------データの受け渡しへ
        data = {
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/softbank', data);
    })();

});



router.get('/pitsoftbank', function (req, res, next) {//ソフトバンク投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_h.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pitsoftbank', data);
    })();

});

router.get('/batsoftbank', function (req, res, next) {//ソフトバンク打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_h.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/batsoftbank', data);
    })();

});






router.get('/seibu', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────西部選手一覧
    var today = new Date();
    var y = today.getFullYear();
    var countth = 1;
    var counttd = 1;

    var th1 = '';
    var th2 = '';
    var th3 = '';
    var th4 = '';
    var th5 = '';
    var th6 = '';
    var th7 = '';
    var th8 = '';
    var th9 = '';

    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';
    var td5 = '';
    var td6 = '';
    var td7 = '';
    var td8 = '';
    var td9 = '';


    var rows = '';
    var rows2 = '';
    var counts = 1;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_l.html';
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
        th8 += '<tr>';
        th9 += '<tr>';
        for (var e of t) {
            const tt = await e.$$('th');
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (countth == 1) {
                    th1 += '<th>' + html + '</th>';
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>';
                } else if (countth == 33) {
                    th3 += '<th>' + html + '</th>';
                } else if (countth == 41) {
                    th4 += '<th>' + html + '</th>';
                } else if (countth == 60) {
                    th5 += '<th>' + html + '</th>';
                } else if (countth == 74) {
                    th6 += '<th>' + html + '</th>';
                } else if (countth == 84) {
                    th7 += '<th>' + html + '</th>';
                } else if (countth == 87) {
                    th8 += '<th>' + html + '</th>';
                } else if (countth == 89) {
                    th9 += '<th>' + html + '</th>';
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
        th8 += '</tr>';
        th9 += '</tr>';

        for (var e of t) {
            const tt = await e.$$('td');
            if (counttd == 2) {
                td1 += '<tr>';
            } else if (counttd > 3 && counttd < 33) {
                td2 += '<tr>';
            } else if (counttd > 33 && counttd < 41) {
                td3 += '<tr>';
            } else if (counttd > 41 && counttd < 60) {
                td4 += '<tr>';
            } else if (counttd > 60 && counttd < 74) {
                td5 += '<tr>';
            } else if (counttd > 74 && counttd < 84) {
                td6 += '<tr>';
            } else if (counttd > 84 && counttd < 87) {
                td7 += '<tr>';
            } else if (counttd > 87 && counttd < 89) {
                td8 += '<tr>';
            } else if (counttd > 89 && counttd < 93) {
                td9 += '<tr>';
            }
            counts = 1;
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>';
                } else if (counttd > 3 && counttd < 33) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 33 && counttd < 41) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 41 && counttd < 60) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 60 && counttd < 74) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 74 && counttd < 84) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 84 && counttd < 87) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 87 && counttd < 89) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td8 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td8 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 89 && counttd < 93) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td9 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td9 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                counts++;
            }
            if (counttd == 2) {
                td1 += '</tr>';
            } else if (counttd > 3 && counttd < 33) {
                td2 += '</tr>';
            } else if (counttd > 33 && counttd < 41) {
                td3 += '</tr>';
            } else if (counttd > 41 && counttd < 60) {
                td4 += '</tr>';
            } else if (counttd > 60 && counttd < 74) {
                td5 += '</tr>';
            } else if (counttd > 74 && counttd < 84) {
                td6 += '</tr>';
            } else if (counttd > 84 && counttd < 87) {
                td7 += '</tr>';
            } else if (counttd > 87 && counttd < 89) {
                td8 += '</tr>';
            } else if (counttd > 89 && counttd < 93) {
                td9 += '</tr>';
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
        rows2 += th8;
        rows2 += td8;
        rows2 += th9;
        rows2 += td9;


        //------------------------------------------------------------------データの受け渡しへ
        data = {
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/seibu', data);
    })();

});


router.get('/pitseibu', function (req, res, next) {//西部投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_l.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pitseibu', data);
    })();

});

router.get('/batseibu', function (req, res, next) {//西部打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_l.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/batseibu', data);
    })();

});



router.get('/rakuten', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────楽天選手一覧
    var today = new Date();
    var y = today.getFullYear();
    var countth = 1;
    var counttd = 1;

    var th1 = '';
    var th2 = '';
    var th3 = '';
    var th4 = '';
    var th5 = '';
    var th6 = '';
    var th7 = '';
    var th8 = '';
    var th9 = '';

    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';
    var td5 = '';
    var td6 = '';
    var td7 = '';
    var td8 = '';
    var td9 = '';


    var rows = '';
    var rows2 = '';
    var counts = 1;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_e.html';
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
        th8 += '<tr>';
        th9 += '<tr>';
        for (var e of t) {
            const tt = await e.$$('th');
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (countth == 1) {
                    th1 += '<th>' + html + '</th>';
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>';
                } else if (countth == 38) {
                    th3 += '<th>' + html + '</th>';
                } else if (countth == 45) {
                    th4 += '<th>' + html + '</th>';
                } else if (countth == 62) {
                    th5 += '<th>' + html + '</th>';
                } else if (countth == 74) {
                    th6 += '<th>' + html + '</th>';
                } else if (countth == 82) {
                    th7 += '<th>' + html + '</th>';
                } else if (countth == 85) {
                    th8 += '<th>' + html + '</th>';
                } else if (countth == 90) {
                    th9 += '<th>' + html + '</th>';
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
        th8 += '</tr>';
        th9 += '</tr>';

        for (var e of t) {
            const tt = await e.$$('td');
            if (counttd == 2) {
                td1 += '<tr>';
            } else if (counttd > 3 && counttd < 38) {
                td2 += '<tr>';
            } else if (counttd > 38 && counttd < 45) {
                td3 += '<tr>';
            } else if (counttd > 45 && counttd < 62) {
                td4 += '<tr>';
            } else if (counttd > 62 && counttd < 74) {
                td5 += '<tr>';
            } else if (counttd > 74 && counttd < 82) {
                td6 += '<tr>';
            } else if (counttd > 82 && counttd < 85) {
                td7 += '<tr>';
            } else if (counttd > 85 && counttd < 90) {
                td8 += '<tr>';
            } else if (counttd > 90 && counttd < 93) {
                td9 += '<tr>';
            }
            counts =1;
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>';
                } else if (counttd > 3 && counttd < 38) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 38 && counttd < 45) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 45 && counttd < 62) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 62 && counttd < 74) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 74 && counttd < 82) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 82 && counttd < 85) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 85 && counttd < 90) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td8 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td8 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 90 && counttd < 93) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td9 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td9 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                counts++;
            }
            if (counttd == 2) {
                td1 += '</tr>';
            } else if (counttd > 3 && counttd < 38) {
                td2 += '</tr>';
            } else if (counttd > 38 && counttd < 45) {
                td3 += '</tr>';
            } else if (counttd > 45 && counttd < 62) {
                td4 += '</tr>';
            } else if (counttd > 62 && counttd < 74) {
                td5 += '</tr>';
            } else if (counttd > 74 && counttd < 82) {
                td6 += '</tr>';
            } else if (counttd > 82 && counttd < 85) {
                td7 += '</tr>';
            } else if (counttd > 85 && counttd < 90) {
                td8 += '</tr>';
            } else if (counttd > 90 && counttd < 93) {
                td9 += '</tr>';
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
        rows2 += th8;
        rows2 += td8;
        rows2 += th9;
        rows2 += td9;


        //------------------------------------------------------------------データの受け渡しへ
        data = {
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/rakuten', data);
    })();

});

router.get('/pitrakuten', function (req, res, next) {//楽天投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_e.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pitrakuten', data);
    })();

});

router.get('/batrakuten', function (req, res, next) {//楽天打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_e.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/batrakuten', data);
    })();

});


router.get('/lotte', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────ロッテ選手一覧
    var today = new Date();
    var y = today.getFullYear();
    var countth = 1;
    var counttd = 1;

    var th1 = '';
    var th2 = '';
    var th3 = '';
    var th4 = '';
    var th5 = '';
    var th6 = '';
    var th7 = '';
    var th8 = '';

    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';
    var td5 = '';
    var td6 = '';
    var td7 = '';
    var td8 = '';


    var rows = '';
    var rows2 = '';
    var counts = 1;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_m.html';
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
        th8 += '<tr>';
        for (var e of t) {
            const tt = await e.$$('th');
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (countth == 1) {
                    th1 += '<th>' + html + '</th>';
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>';
                } else if (countth == 41) {
                    th3 += '<th>' + html + '</th>';
                } else if (countth == 48) {
                    th4 += '<th>' + html + '</th>';
                } else if (countth == 62) {
                    th5 += '<th>' + html + '</th>';
                } else if (countth == 75) {
                    th6 += '<th>' + html + '</th>';
                } else if (countth == 84) {
                    th7 += '<th>' + html + '</th>';
                } else if (countth == 87) {
                    th8 += '<th>' + html + '</th>';
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
        th8 += '</tr>';

        for (var e of t) {
            const tt = await e.$$('td');
            if (counttd == 2) {
                td1 += '<tr>';
            } else if (counttd > 3 && counttd < 41) {
                td2 += '<tr>';
            } else if (counttd > 41 && counttd < 48) {
                td3 += '<tr>';
            } else if (counttd > 48 && counttd < 62) {
                td4 += '<tr>';
            } else if (counttd > 62 && counttd < 75) {
                td5 += '<tr>';
            } else if (counttd > 75 && counttd < 84) {
                td6 += '<tr>';
            } else if (counttd > 84 && counttd < 87) {
                td7 += '<tr>';
            } else if (counttd > 87 && counttd < 92) {
                td8 += '<tr>';
            }
            counts = 1;
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>';
                } else if (counttd > 3 && counttd < 41) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 41 && counttd < 48) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 48 && counttd < 62) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 62 && counttd < 75) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 75 && counttd < 84) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 84 && counttd < 87) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 87 && counttd < 92) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td8 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td8 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                counts++;
            }
            // console.log(countth);
            if (counttd == 2) {
                td1 += '</tr>';
            } else if (counttd > 3 && counttd < 41) {
                td2 += '</tr>';
            } else if (counttd > 41 && counttd < 48) {
                td3 += '</tr>';
            } else if (counttd > 48 && counttd < 62) {
                td4 += '</tr>';
            } else if (counttd > 62 && counttd < 75) {
                td5 += '</tr>';
            } else if (counttd > 75 && counttd < 84) {
                td6 += '</tr>';
            } else if (counttd > 84 && counttd < 87) {
                td7 += '</tr>';
            } else if (counttd > 87 && counttd < 92) {
                td8 += '</tr>';
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
        rows2 += th8;
        rows2 += td8;


        //------------------------------------------------------------------データの受け渡しへ
        data = {
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/lotte', data);
    })();

});


router.get('/pitlotte', function (req, res, next) {//ロッテ投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_m.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pitlotte', data);
    })();

});

router.get('/batlotte', function (req, res, next) {//ロッテ打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_m.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/batlotte', data);
    })();

});





router.get('/hokkaido', function (req, res, next) {    //─────────────────────────────────────────────────────────────────────日ハム選手一覧
    var today = new Date();
    var y = today.getFullYear();
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
    var counts = 1;
    //─────────────────────────────────────────────────────────────────────ここからスクレイピング
    const url = 'https://npb.jp/bis/teams/rst_f.html';
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
                    th1 += '<th>' + html + '</th>';
                } else if (countth == 3) {
                    th2 += '<th>' + html + '</th>';
                } else if (countth == 42) {
                    th3 += '<th>' + html + '</th>';
                } else if (countth == 51) {
                    th4 += '<th>' + html + '</th>';
                } else if (countth == 68) {
                    th5 += '<th>' + html + '</th>';
                } else if (countth == 76) {
                    th6 += '<th>' + html + '</th>';
                } else if (countth == 85) {
                    th7 += '<th>' + html + '</th>';
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
                td1 += '<tr>';
            } else if (counttd > 3 && counttd < 42) {
                td2 += '<tr>';
            } else if (counttd > 42 && counttd < 51) {
                td3 += '<tr>';
            } else if (counttd > 51 && counttd < 68) {
                td4 += '<tr>';
            } else if (counttd > 68 && counttd < 76) {
                td5 += '<tr>';
            } else if (counttd > 76 && counttd < 85) {
                td6 += '<tr>';
            } else if (counttd > 85 && counttd < 90) {
                td7 += '<tr>';
            }
            counts = 1;
            for (var ee of tt) {
                const html = await page.evaluate(body => body.innerHTML, ee);
                // console.log(html);
                if (counttd == 2) {
                    td1 += '<td>' + html + '</td>';
                } else if (counttd > 3 && counttd < 42) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td2 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td2 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 42 && counttd < 51) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td3 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td3 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 51 && counttd < 68) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td4 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td4 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 68 && counttd < 76) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td5 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td5 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 76 && counttd < 85) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td6 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td6 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                } else if (counttd > 85 && counttd < 90) {
                    if (counts == 2) {
                        const href = await ee.$('a', (ee) => ee.href);
                        if (href != null) {
                            const test = await href.getProperty('href');
                            const urls = await test.jsonValue();
                            var a = html.slice(0, 9)
                            var b = urls;
                            var c = html.slice(35)
                            a += b;
                            a += c;
                            td7 += '<td>' + a + '</td>';
                            // console.log(a);
                        }
                    } else {
                        td7 += '<td>' + html + '</td>';
                        // console.log(html);
                    }
                }
                counts++;
            }
            // console.log(countth);
            if (counttd == 2) {
                td1 += '</tr>';
            } else if (counttd > 3 && counttd < 42) {
                td2 += '</tr>';
            } else if (counttd > 42 && counttd < 51) {
                td3 += '</tr>';
            } else if (counttd > 51 && counttd < 68) {
                td4 += '</tr>';
            } else if (counttd > 68 && counttd < 76) {
                td5 += '</tr>';
            } else if (counttd > 76 && counttd < 85) {
                td6 += '</tr>';
            } else if (counttd > 85 && counttd < 90) {
                td7 += '</tr>';
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
            year: y,
            content: rows,
            content2: rows2,
        };
        res.render('baseball/hokkaido', data);
    })();

});



router.get('/pithokkaido', function (req, res, next) {//日ハム投手成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idp1_f.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/pithokkaido', data);
    })();

});

router.get('/bathokkaido', function (req, res, next) {//日ハム打撃成績
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    const url = 'https://npb.jp/bis/2023/stats/idb1_f.html';
    var rows = '';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const thkun = await page.$$('#stdivmaintbl > table > tbody > tr');//head部取得コード
        for (var h of thkun) {
            rows += '<tr>';
            const thhkun = await h.$$('th');
            for (hh of thhkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<th>' + htmlh + '</th>';
            }
            rows += '</tr>';
        }

        const tdkun = await page.$$('#stdivmaintbl > table > tbody > .ststats');//head部取得コード
        for (var h of tdkun) {
            rows += '<tr>';
            const tddkun = await h.$$('td');
            for (hh of tddkun) {
                const htmlh = await page.evaluate(body => body.innerHTML, hh);
                rows += '<td>' + htmlh + '</td>';
            }
            rows += '</tr>';
        }

        var data = {
            year: y,
            month: m,
            day: d,
            content: rows,
        };
        res.render('baseball/bathokkaido', data);
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