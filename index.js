const fs = require('fs');
const request = require('request');
const assert = require('assert');
const puppeteer = require('puppeteer');
const Urls = require('./constant');


browsePage = async (element, index) => {
  const browser = await puppeteer.launch({executablePath: '/Applications/Google Chrome 2.app/Contents/MacOS/Google Chrome'})
  const page = await browser.newPage();
  await page.goto(element.link); //default 1000
  const url = await page.evaluate(() => {
    return document.getElementsByTagName("iframe")[0].src
  })
  await getVideoInfo(url, index, browser)
  await browser.close()
}

getVideoInfo = async (link, index, browser) => {
  console.log(link)
  const page = await browser.newPage()
  await page.goto(link)
  await page.screenshot({path: `${index}.png`, fullPage: true})
  const duration = await page.evaluate(async () => {
    return new Promise((resolve, reject) => {
      var video = document.getElementsByTagName("video")[0];
      var videoDuration = 0;
      video.addEventListener('loadedmetadata', function() {
        resolve(video.duration);
      });
      video.play();
    })
  });
  console.log(duration);
}


function getJson() {
  var url = new Urls();
  var options = {
    url: url.SITE_81,
    method: 'GET',
    json: true,
  }
  request(options, function (error, response, body) {
    response.body.items.map(function(element, index, array) {
      browsePage(element,index);
    });
  })
}

getJson()
