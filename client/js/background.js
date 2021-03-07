var urlList = undefined;
var value = null;
chrome.storage.local.get(null,function (data){urlList = Object.keys(data)})
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
        response.json().then(function (data) {
         //to view fetched data
        //  console.log(data);
         resolve(data);
         // chrome.storage.local.get()
       });
     }
   )
   .catch(function(err) {
    //  console.log('Fetch Error :-S', err);
     reject(err);
   });
  });
}

function getStatus(url) {
  return new Promise(function(resolve, reject) {
    chrome.storage.local.get(url, function(items) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(items[url]);
      }
    });
  });
}
function getFinal(data) {
  return new Promise((resolve)=>{
    if (data) {
      value = 'tracked';
    } else {
      value = 'not tracked';
    }
    resolve(value);
  })
}
const dealWithTracking = async (msg) => {
  try {
    const data = await getStatus(msg.url_to_check);
    const val = await getFinal(data);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {message: val});
    });
  } catch(err) {
    console.log(err);
  }
  
}
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // console.log(msg);
  // if (msg.url_to_check) {
  //   var value = null;
  //   console.log(`got here url_to_check = ${msg.url_to_check}`);
  //   getStatus(msg.url_to_check)
  //     .then((data) => {
  //       if (data) {
  //         console.log(data);
  //         // return sendResponse('tracked');
  //         value = 'tracked';
  //       } else {
  //         console.log(data);
  //         // return sendResponse('not tracked');
  //         value = 'not tracked';
  //       }
  //       console.log(value);
  //       return sendResponse(value);
  //     }).catch((error) => {
  //       console.log(error);
  //     })
  // }
    // chrome.storage.local.get(msg.url_to_check, function (status) {
    //   console.log(`status = ${status[msg.url_to_check]}`);
    //   if (status[msg.url_to_check] !== undefined) {
    //     console.log('tracked');
    //     value = 'tracked';   
    //   }else { 
    //     console.log('not tracked');
    //     // return sendResponse({ state: 'not tracked' });
    //     value = 'not tracked';
    //   }
    // })
    // return sendResponse(value)
  if (msg.url_to_check) {
    dealWithTracking(msg);
    }    
  else {
    var item = {};
    var key = msg.url;
    item[key] = msg;
    chrome.storage.local.set(item, function () {
    });
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
}, 30000)
var trigger = function(){
  chrome.browserAction.setBadgeText({text:'🔔'})
}

function logStorageChange(changes, area) {
  // console.log("Change in storage area: " + area);
  chrome.storage.local.get(null,function (data){urlList = Object.keys(data)})
  let changedItems = Object.keys(changes);

  for (let item of changedItems) {
    // console.log(item + " has changed:");
    // console.log("Old value: ");
    // console.log(changes[item].oldValue);
    // console.log("New value: ");
    // console.log(changes[item].newValue);
    if (!changes[item].oldValue) {
      chrome.browserAction.setBadgeText({text:'🔔'})    
    } else {
      chrome.browserAction.setBadgeText({text:''})    
    }
  }
}
chrome.browserAction.setBadgeBackgroundColor({color:'red'})
chrome.storage.local.onChanged.addListener(logStorageChange)
// setInterval(toDo, 7000);
// console.log(`urlList = ${urlList}`);