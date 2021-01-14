const firefox = require('selenium-webdriver/firefox');
const {Builder,By,Key,util} = require("selenium-webdriver");
const screen = {
    width: 1280,
    height: 720
  };
const scrapeData = ()=>{
    var sizes = [];
    document.getElementsByClassName("value").forEach((item,index,arr)=>(sizes.push(arr[index].innerHTML)));
    sizes[0] = document.title;
    return sizes;
    }
const scrapper = async (url,callback)=>{
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
                console.log(text);
                text = text.replace(/,/g, ''); 
                var myRe = /([\d]*\B\d)/;
                text = myRe.exec(text)[0];
                console.log(text);
                returnValue[1] = text; 
            }).catch(async (err)=>{
                await driver.close();
                console.log(err);
                // res.send(err);
                callback(err,undefined);
            });
            // res.send(returnValue);
            await driver.close();
            var res = {data:returnValue};
            callback(undefined,res);
        });
    }
    catch(err){
        console.log(err);
        // res.send(err);
        callback(err,undefined)
    }
}
module.exports = scrapper;
