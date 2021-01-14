// alert("working");
var topList = document.getElementsByClassName('menu__session')[0];
var trackButton = document.createElement('button');
trackButton.id="extensionTrackingButton";
trackButton.textContent = 'Track Product';
trackButton.style.height = "30px";
trackButton.style.width = "100px";
topList.appendChild(trackButton);
var imgData = "not yet loaded";
// var mygroup = document.getElementsByClassName('group')[0];
// var imgSrc = mygroup.children[0].children[0].children[0].src;
var convertImgToDataURLviaCanvas = function(url, callback) {
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
let retImgData =()=>{
    var imgSrc = document.getElementsByClassName('group')[0].children[0].children[0].children[0].src;
        convertImgToDataURLviaCanvas( imgSrc,function( base64_data ) {
        imgData = base64_data;
        console.log(imgData);
      } );
}
trackButton.addEventListener('click',retImgData);


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