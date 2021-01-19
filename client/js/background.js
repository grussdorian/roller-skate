// chrome.storage.sync.QUOTA_BYTES = 104857600000
// chrome.storage.sync.QUOTA_BYTES_PER_ITEM = 104857600000
var counter = localStorage.getItem('counter')||0;
console.log(counter)
var local_domain = 'http://localhost:5050/?url=';

function fetchData(url) {
  return new Promise(function(resolve, reject) {
    fetch(url)
    .then(
     function(response) {
       if (response.status !== 200) {
         console.log('Looks like there was a problem. Status Code: ' +
           response.status);
        //  return;
         reject('something wrong happened');
       }
 
       // Examine the text in the response
       response.json().then(function(data) {
         console.log(data);
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


// const fetchData = (url) => {
//     fetch(url)
//    .then(
//     function(response) {
//       if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' +
//           response.status);
//         return;
//       }

//       // Examine the text in the response
//       response.json().then(function(data) {
//         console.log(data);
//         return data;
//         // chrome.storage.local.get()
//       });
//     }
//   )
//   .catch(function(err) {
//     console.log('Fetch Error :-S', err);
//   });
// }

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    localStorage.setItem('counter', ++counter);
    // console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
    var product_url = local_domain + msg.url;
    // fetchData(product_url);
    // localStorage.setItem(msg.product.url, item);
    var item = {};
    item[counter] = msg;
    // console.log(`counter -> ${counter} item -> ${item} `);
    chrome.storage.local.set(item, function() {
        // console.log(`Data is set key:${counter} value:${msg}`); 
      });      
    sendResponse("Gotcha!");
});
console.log(`counter = ${counter}`);

const toDo = (i) => {
  console.log(` i = ${i}`);
  chrome.storage.local.get(i, async function (product) {
    try {
      console.log(`product => ${product[i].url}`);
      product = product[i];
      var product_url = local_domain + product.url;
      product_info = await fetchData(product_url);  
      product.curr_price = await product_info.price;
      product.sizes_available = await product_info.sizes;
      var item = {};
      item[i] = await product;
      await chrome.storage.local.set(item, function (){
        console.log(`modified value`);
      })
    } catch (err){
      console.log(`error occured ${err}`);
    }
  });
}
var i = 0;
setInterval(() => {
  i = (i + 1) % counter;
  i = i+ ''
  toDo(i);
  i = parseInt(i, 10);
 },7000)

// setInterval(toDo, 7000);