const puppeteer = require('puppeteer');
const express = require('express')
const app = express();
var counter = 0;
const firefoxOptions = {
    headless:false,
    product: 'firefox',
    extraPrefsFirefox: {
    }
  };
const getBrowser = async ()=>{
	var browser = await puppeteer.launch(firefoxOptions);
	return browser;
}
var browser = undefined;
const scraper = async (browser,url,callback)=>{
	try{
		const page = await browser.newPage();
		await page.goto(url);
		// await page.waitForSelector('.value');
		const sizes = await page.$$eval('.value', allSizes => allSizes.map(size => size.textContent));
		console.log(sizes);
		await page.goto('about:blank');
		await page.close();
		callback(undefined,sizes);
	}catch(err){
		console.log(err);
		callback(err,undefined);
	}
}

app.get('/',async (req,res)=>{
    counter = (counter+1)%10;
    if(counter==0){
        browser.close();
        browser=undefined;
    }
    if(!browser){
        browser = await getBrowser();
    }
    scraper(browser,req.query.url,(error,result)=>{
        if(error){
            return res.send({error:error})
        }
        return res.send(result);
    });
})

app.listen("3000",()=>{
	console.log(`app listening on port 3000`)
})