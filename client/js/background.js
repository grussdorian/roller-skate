// chrome.storage.sync.QUOTA_BYTES = 104857600000
// chrome.storage.sync.QUOTA_BYTES_PER_ITEM = 104857600000
var counter = localStorage.getItem('counter')||0;
console.log(counter)
var local_domain = 'http://localhost:5050/?url=';
const fetchData = (url) => {
    fetch(url)
   .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    localStorage.setItem('counter', ++counter);
    // console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
    var product_url = local_domain + msg.url;
    fetchData(product_url);
    // localStorage.setItem(msg.product.url, item);
    var item = {};
    item[counter] = msg;
    // console.log(`counter -> ${counter} item -> ${item} `);
    chrome.storage.local.set(item, function() {
        // console.log(`Data is set key:${counter} value:${msg}`); 
      });      
    sendResponse("Gotcha!");
});