document.addEventListener('DOMContentLoaded', function () {
  var products = [];
  let removeCard = async (item) => {
    try {
      var link = item.parentElement.parentElement.children[7].href
      item.parentElement.parentElement.parentElement.parentElement.remove()
      await chrome.storage.local.remove(link);
      localStorage.removeItem(link);  
      var counter = Object.keys(localStorage).length;
      if (counter == 0) {
        location.reload
      }
    } catch (err) {
      console.log(err);
    }
    
  }
  function fetchData() {
    return new Promise(function (resolve) {
      chrome.storage.local.get(null, function (res) {
        resolve(res);
      });
    })
  }
  let getFromStorage = async () => {
    try {
      const res = await fetchData();
      console.log(res);
      // for (i in urlList){
      //   products.push(res[i]);
      // }
      products = Object.values(res);
      products.sort(function(a,b) {
        return b.time - a.time;
      });
      console.log(products);
      const resHTML = products.map(product=>{
        // other code
        return `<div class="card">
        <div class='card-outer'>
            <div class="card-inner">
                  <a href="${product.url}" rel="noopener noreferrer"
                      target="_blank">
                      <img class='product-image' src='${product.img}'>
                  </a>
                <div class='info'>
                    <div class="remove-product-button">
                        <img src='../css/cross.svg' class='cross-svg'>
                    </div>
                    <div class="title">${product.title}</div>
                    <div class="price">${product.curr_price}</div>
                    <div class="sizes">Sizes available</div>
                    <div class='sizes-available-background'>
                        <div class="sizes-available-text">${product.sizes_available}</div>
                    </div>
                    <div class='size-to-track'>Select size to track</div>
                    <div class="tracked-size">
                        <div class="tracked-size-button">
                            <div class="tracked-size-text">M</div>
                        </div>
                    </div>
                    <a class='link-button' href="${product.url}"
                        rel="noopener noreferrer" target="_blank">
                        <div class="open-product-button">
                            <div class='open-product-button-outer'>
                                <div class="open-product">Open</div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
      </div>`
      }).join('')
      var placeholder = document.getElementById('repeat')
      placeholder.innerHTML = resHTML;
        document.querySelectorAll('.cross-svg').forEach(item => {
          item.addEventListener('click', event => {
            removeCard(item)
          })
        })
    } catch(err) {
      console.log(`error occured ${err}`);
    }
  }
  getFromStorage();
 
  
}, false)
  
