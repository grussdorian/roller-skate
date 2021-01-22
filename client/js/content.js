// alert("working");
const id = "dfjjhpfkphenkadfomhmckmckioghjgn";
var topList = document.getElementsByClassName('menu__session')[0];
var trackButton = document.createElement('button');
var url = document.location.href;
trackButton.id = "extensionTrackingButton";
trackButton.className = "extensionInjectedButtons";
trackButton.textContent = 'Track Product';
const convertImgToDataURLviaCanvas = function(url, callback) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL();
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}
var state = false;
chrome.runtime.sendMessage({ url_to_check: url }, function (res) {
  console.log(`status is ${res}`);
  if (res === 'tracked') {
    trackButton.style.background = "#1ecc07";
    trackButton.style.borderColor = "#1ecc07";
    trackButton.style.color = "white";
  }
  state = res;
});


topList.appendChild(trackButton);
// var imgData = "not yet loaded";
// var mygroup = document.getElementsByClassName('group')[0];
// var imgSrc = mygroup.children[0].children[0].children[0].src;
let sendMessageToBackground = () => {
  if (state === 'tracked') {
    console.log('already tracking');
    return;
  };
  var imgSrc = document.getElementsByClassName('product-detail-main-image-container')[0].children[0].src
  convertImgToDataURLviaCanvas(imgSrc, function (base64_data) {
    var productId = document.getElementById('product-price')
    var number_of_sizes = document.getElementsByClassName('picker-list')[0].childElementCount;
    var name = document.getElementsByClassName('primary product-item-headline')[0].innerText
    var sizes = []
    for (i = 1; i < number_of_sizes-1; i = i + 1){
      sizes[i - 1] = document.getElementsByClassName('picker-list')[0].children[i].innerText;
    }
    if (sizes.length == 0) {
      sizes[0] = "Not applicable"
    }
    // var sizes = document.getElementsByClassName('value').innerText;
    var timestamp = new Date().getTime();
    var price = productId.children[0].children[0].textContent;
    var product_info = {
        url: url,
        title: name,
        img: base64_data,
        curr_price: price,
        sizes_available: sizes,
        time: timestamp
    }
      // product_info = JSON.stringify(product_info);
      // console.log(product_info);
      // chrome.runtime.sendMessage(id, { product: product_info }, function (response) {
      // console.log(`DONE! ${response}`);
      // })
        chrome.runtime.sendMessage(product_info, function(response) {
          console.log("Response: ", response);
          if (response) {
            trackButton.className = "buttonClicked";
            trackButton.style.background = "#1ecc07";
            trackButton.style.borderColor = "1ecc07";
            trackButton.style.fontSize = "16px";
            trackButton.style.color = "white";
          }
          else console.log(`something went wrong`);
      });
    });
}
trackButton.addEventListener('click',sendMessageToBackground);


// chrome.runtime.onMessage.addListener(function (request,sender,sendResponse) {
//   link = document.location.href;
//   sendResponse({curUrl: link});
//   alert(request)
// },false);

// const re = new RegExp('bear', 'gi')
// const matches = document.documentElement.innerHTML.match(re) || []

// chrome.runtime.sendMessage({
//   url: window.location.href,
//   count: matches.length
// })