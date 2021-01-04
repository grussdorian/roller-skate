const express = require('express');
const scrapper = require('./driver-code');
// const initialize = require('./init');
const firefox = require('selenium-webdriver/firefox');
const {Builder,By,Key,util} = require("selenium-webdriver");
const screen = {
    width: 640,
    height: 480
  };



// Promise.all([driver1.build(),driver2.build(),driver3.build(),driver4.build()]).then(()=>{
//     startup = false;
// });
let buildDrivers = ()=>{
    let driver1 = new Builder().forBrowser("firefox").setFirefoxOptions(new firefox.Options()
        // .headless()
        .windowSize(screen))
        .build();
    let driver2 = new Builder().forBrowser("firefox").setFirefoxOptions(new firefox.Options()
        .headless()
        .windowSize(screen))
        .build();
    let driver3 = new Builder().forBrowser("firefox").setFirefoxOptions(new firefox.Options()
        .headless()
        .windowSize(screen))
        .build();
    let driver4 = new Builder().forBrowser("firefox").setFirefoxOptions(new firefox.Options()
        .headless()
        .windowSize(screen))
        .build();
    return [driver1,driver2,driver3,driver4]
}

//var url1 = "https://www2.hm.com/en_in/productpage.0939385001.html";
var url1 = "https://www2.hm.com/en_in/productpage.0898892001.html";
var url2 = "https://www2.hm.com/en_in/productpage.0905416005.html";
var url3 = "https://www2.hm.com/en_in/productpage.0513512004.html";
var url4 = "https://www2.hm.com/en_in/productpage.0935746003.html";

//if(!startup) scrapper(driver1,url1);
console.log("got here1");
// scrapper(url2);
// console.log("got here2");
// scrapper(url3);
// console.log("got here3");
// scrapper(url4);
// console.log("got here4");
drivers = buildDrivers();
const app = express()
const port = 3000

app.get('/',async (req,res)=>{
    //res.send("hello world!")
    await scrapper(req,res,drivers[0],By,req.query.url);
    //res.sendFile('/home/hardik/Desktop/roller-skate/views/webpage.html')
    //console.log("Here", prices);
    //res.send(prices);
})
app.listen(port,()=>{
    console.log("app running on port 3000")
})