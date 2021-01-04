const scrapeData = ()=>{
    var sizes = [];
    document.getElementsByClassName("value").forEach((item,index,arr)=>(sizes.push(arr[index].innerHTML)));
    sizes.shift();
    return sizes;
    }
async function scrapper(req,res,driver,By,url){
    try{
        path = '/html/body/main/div[2]/div[2]/div[1]/div[1]/div/section/div/div/hm-product-price'
        await driver.get(url);
        await driver.executeScript(scrapeData).then(async function (returnValue){
            console.log("Return value of scrapeData ->" + returnValue);
            await driver.findElement(By.xpath(path)).getText().then((text)=>{returnValue[0] = text });
            res.send(returnValue);
            // returnValue[0]
            //if(returnValue) console.log("working");
            // driver.close();
        });
    }
    catch(err){
        console.log(err);
        res.send("err");
    }
}
module.exports = scrapper;
