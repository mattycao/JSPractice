import request from 'request';
import cheerio from 'cheerio';


function fetch(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
}

async function articleList() {
    const data = await fetch('https://cnodejs.org/');
    const $ = cheerio.load(data);
    const list = [];
    $('.topic_title').each(function () {
        const link = $(this).prop('href');
        const title = $(this).text().trim();
        if (link) {
            list.push({title, link: link.trim()});
        }
    });
    return list;
}

async function articleDetail(url) {
    const data = await fetch('https://cnodejs.org' + url);
    return data.length;
}

async function start() {
    const list = await articleList();
    for (const item of list) {
        const length = await articleDetail(item);
        console.log('%s [%s]', item.title, length);
    }
    console.log('done');
}

start().then(ret => console.log(ret)).catch(err => console.error(err));