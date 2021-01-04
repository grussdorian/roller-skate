const firefox = require('selenium-webdriver/firefox');
const {Builder,By,Key,util} = require("selenium-webdriver");
const screen = {
    width: 640,
    height: 480
  };
const scrapeData = ()=>{
    var sizes = [];
    document.getElementsByClassName("value").forEach((item,index,arr)=>(sizes.push(arr[index].innerHTML)));
    sizes[0] = document.title;
    return sizes;
    }
const scrapper = async (driver1,By,url,callback)=>{
    try{

        let driver = new Builder().forBrowser("firefox").setFirefoxOptions(new firefox.Options()
        .headless()
        .windowSize(screen))
        .build();
        path = '/html/body/main/div[2]/div[2]/div[1]/div[1]/div/section/div/div/hm-product-price'
        await driver.get(url);
        await driver.executeScript(scrapeData).then(async function (returnValue){
            console.log("Return value of scrapeData ->" + returnValue);
            await driver.findElement(By.xpath(path)).getText().then((text)=>{
                text = text.replace(/,/g, ''); 
                var myRe = /([\d]*\B\d)/;
                text = myRe.exec(text)[0];
                console.log(text);
                returnValue[1] = text; 
            });
            // res.send(returnValue);
            await driver.close();
            callback(undefined,returnValue);
        });
    }
    catch(err){
        console.log(err);
        // res.send(err);
        callback(err,undefined)
    }
}
module.exports = scrapper;
