document.addEventListener('DOMContentLoaded', function () {
  var products = [];
  var counter = localStorage.getItem('counter');
  let getFromStorage = async () => {
    try {
      chrome.storage.local.get(null, function (res) {
        for (i = 1; i <= counter; i++){
          products.push(res[i]);
        }
        console.log(products);
        const resHTML = products.map(product=>{
          // other code
          return `
          <h3 class='title'>${product.title}</h3>
          <h4 class='price'>${product.curr_price}</h4>
          <img class='product-image' src=${product.img} height='150px' width='100px'>
          <p class='sizes'>Sizes available ${product.sizes_available}</p>
          <a class='link-button' href="${product.url}" rel="noopener noreferrer" target="_blank">Open product</a>
          `
        }).join('')
        console.log(resHTML);
        var placeholder = document.getElementById('repeat')
        placeholder.innerHTML = resHTML;

      });
      // console.log(products[0].url);
    } catch(err) {
      console.log(`error occured ${err}`);
    }
  }
  getFromStorage();
  
  // var myObj = [
//     {
// 	link: 'helloworld.com',
// 	type: 'webpage',
// 	price: 1200,
// 	sizes: ["1233","1256","XS"],
//     }
// 	]




  
  
    // const bg = chrome.extension.getBackgroundPage()
    // Object.keys(bg.bears).forEach(function (url) {
    //   const div = document.createElement('div')
    //   div.textContent = `${url}: ${bg.bears[url]}`
    //   document.body.appendChild(div)
    // })

    // const onclick =  ()=> {
    //   chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, 'hi',setCount)
    //   })
    // }
    // document.querySelector('button').addEventListener('click', onclick, false)

    // function setCount (res) {
    //   alert(res)
    //   const div = document.createElement('div')
    //   div.textContent = `${res.count} bears`
    //   document.body.appendChild(div)
    // }
  
  
  }, false)