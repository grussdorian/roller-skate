var urlList = Object.keys(localStorage);
var local_domain = 'http://localhost:5050/?url=';

function fetchData(url) {
  return new Promise(function(resolve, reject) {
    fetch(url)
    .then(
     function(response) {
       if (response.status !== 200) {
         console.log('Looks like there was a problem. Status Code: ' +
           response.status);

         reject('something wrong happened');
       }
 
       // Examine the text in the response
       response.json().then(function(data) {
        //  console.log(data);
         resolve(data);
         // chrome.storage.local.get()
       });
     }
   )
   .catch(function(err) {
     console.log('Fetch Error :-S', err);
     reject(err);
   });
  });
}


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // console.log(msg);
  if (msg.url_to_check) {
    // console.log(`got here url_to_check = ${msg.url_to_check}`);
    var state = localStorage.getItem(msg.url_to_check)
      // console.log(state);
        if (state) {
          return sendResponse('tracked');
        } else {
          localStorage.setItem(msg.url_to_check,'tracked')
          return sendResponse('not tracked');
        }
    } else {
      var item = {};
      var key = msg.url;
      item[key] = msg;
      chrome.storage.local.set(item, function () {
      });
      urlList = Object.keys(localStorage);
      return sendResponse("Gotcha!");
    }    
});


const toDo = (i) => {
  // console.log(` i = ${i}`);
  chrome.storage.local.get(i, async function (product) {
    try {
      // console.log(`product.url => ${product[i].url}`);
      product = product[i];
      var key = i
      // console.log(`key = ${key}`)
      var product_url = local_domain + product.url;
      product_info = await fetchData(product_url);  
      product.curr_price = await product_info.price;
      product.sizes_available = await product_info.sizes;
      var item = {};
      item[key] = await product;
      // console.log(item);
      await chrome.storage.local.set(item, function (){
        // console.log(`modified value ${item}`);
      })
    } catch (err){
      // console.log(`error occured ${err}`);
    }
  });
}
var i = 0;
setInterval(() => {
  toDo(urlList[i]);
  i = (i + 1) % urlList.length;
 },30000)

// setInterval(toDo, 7000);
// console.log(`urlList = ${urlList}`);