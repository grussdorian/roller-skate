const puppeteer = require('puppeteer-firefox');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
var counter = 0;
const myRe = /([\d]*\B\d)/;
const limit = process.env.RAM_LIMIT || 16;
const port = process.env.PORT || 5050;
const firefoxOptions = {
    // headless:false,
    // product: 'firefox',
    // extraPrefsFirefox: {
    // }
};
var browser = undefined;
const scraper = async (browser,url,callback)=>{
	try{
		const page = await browser.newPage();
		await page.goto(url);
        await page.waitForSelector('.value');
        await page.waitForSelector('#product-price');
        // await page.waitForSelector('.primary product-item-headline');
        var sizes = await page.$$eval('.value', allSizes => allSizes.map(size => size.textContent));
        var price = await page.$$eval('#product-price', allPrices => allPrices.map(price => price.textContent));
        price = price[0];
        price = price.replace(/,/g, '');    
        price = myRe.exec(price)[0];
        sizes.shift();
        sizes[0] = price;
        // console.log(price);
        // console.log(sizes);
		await page.goto('about:blank');
        await page.close();
		callback(undefined,sizes);
    } catch (err) {
        // res.status(500).send({ error: err });
		callback(err,undefined);
	}
}

app.get('/', async (req, res) => {
    
    counter = (counter + 1) % limit;
    // console.log(`counter = ${counter}`);
    if(counter==0){
        await browser.close();
        browser=undefined;
    }
    if(!browser){
        browser = await puppeteer.launch(firefoxOptions);
    }
    let pages = await browser.pages();
    // console.log(`Number of pages -> ${pages.length} counter -> ${counter}`);
    if (counter == 15 && pages.length > 1) {
        // res.status(503).send({
        //     error: "There is an error",
        //     code: 503,
        //     message: "Overloaded, Try again after some time"
        // })
    }
    await scraper(browser,req.query.url,(err,result)=>{
        if (err) {
            // console.log(`Error => ${err}`);
            return res.status(500).send({
                error: "There is an error",
                code: 500,
                message: err.message
            });
        }
        var Price = result[0];
        result.shift();
        return res.status(200).send({
            price: Price,
            sizes: result
        });
    });
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})