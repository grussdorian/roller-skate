require('dotenv').config()
const express = require('express');
const scrapper = require('./driver-code');
// const initialize = require('./init');
const firefox = require('selenium-webdriver/firefox');
const {Builder,By,Key,util} = require("selenium-webdriver");
const screen = {
    width: 640,
    height: 480
  };
  const app = express()
  const port = process.env.PORT || 2021;
// let driver = new Builder().forBrowser("firefox").setFirefoxOptions(new firefox.Options()
//     // .headless()
//     .windowSize(screen))
//     .build();
driver = 'foo';
app.get('/',(req,res)=>{
    scrapper(driver,By,req.query.url,(error,result)=>{
        if(error){
            return res.send({error:error})
        }
        return res.send({
            result:result
        })
    });
})
app.listen(port,()=>{
    console.log(`app running on port ${port}`);
})