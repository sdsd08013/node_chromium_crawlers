const fs = require('fs');
const request = require('request');
const assert = require('assert');

var options = {
  //url: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.deepfera.com%2Ffeed%2F&api_key=kvaq7prj7saqwsvpll64r866k0igxuntnjlnbkhu',
  method: 'GET',
  json: true,
}

const rss2json = () => {
  request(options, function (error, response, body) {
    response.body.items.map(function(element, index, array) {
      (async() => {
        console.log(element.link)
        const accessLink = () => {
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
          request(options, function (error, response, body) {
            console.log(element.link);
              browsing(element.title, element.link, browser, page);
          })
          const browsing = (title, link, browser, page) => {
            process.on('unhandledRejection', console.dir)
            await page.goto(link, {waitUntil: 'networkidle',networkIdleTimeout:5000}); //default 1000
            await page.screenshot({path: 'home.png', fullPage: true});
          }
        }

        accessLink()


      })();
    });
  })
}
rss2json()
