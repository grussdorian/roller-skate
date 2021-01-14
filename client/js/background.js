// var imgSrc = mygroup.children[0].children[0].children[0].src;

// var convertImgToDataURLviaCanvas = function(url, callback) {
//     var img = new Image();
  
//     img.crossOrigin = 'Anonymous';
  
//     img.onload = function() {
//       var canvas = document.createElement('CANVAS');
//       var ctx = canvas.getContext('2d');
//       var dataURL;
//       canvas.height = this.height;
//       canvas.width = this.width;
//       ctx.drawImage(this, 0, 0);
//       dataURL = canvas.toDataURL();
//       callback(dataURL);
//       canvas = null;
//     };
  
//     img.src = url;
//   }
  
//   convertImgToDataURLviaCanvas( imgSrc, function( base64_data ) {
//       imgData = base64_data ;
//   } );

