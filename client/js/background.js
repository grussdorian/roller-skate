// chrome.runtime.onMessageExternal.addListener(function (req, sender, res) {
//     console.log("got here");
//     if (req.product) {
//         console.log(req.product);
//    } 
// });
var url = 'http://localhost:5050/?url=';
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

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
    url = url + msg.product.url;
    console.log(`message.url -> ${msg.product.url} url -> ${url} `);
    fetchData(url);
    item = JSON.stringify(msg);
    localStorage.setItem('product1', item);
    sendResponse("Gotcha!");
});

