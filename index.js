const fs = require('fs');
const request = require('request');
const assert = require('assert');
const puppeteer = require('puppeteer');


browsePage = async (element, index) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
  await page.goto(element.link); //default 1000
  await page.screenshot({path: `${index}.png`, fullPage: true});
}

function getJson() {
	var options = {
		url: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.deepfera.com%2Ffeed%2F&api_key=kvaq7prj7saqwsvpll64r866k0igxuntnjlnbkhu',
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
