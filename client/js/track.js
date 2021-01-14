// const tracker = ()=> {
//     var link = 
//     fetch(reqString).then((result)=>{
//         // console.log(result);
//         document.getElementById("price").innerHTML = result;
//     })
// }
// document.getElementById("track").onclick = tracker;

// fetch("http://localhost:3000/?url=https://www2.hm.com/en_in/productpage.0926693001.html")
//     .then((data)=>{
//         data.json().then((response)=>{
//             console.log(response);
//         })
//     });

document.addEventListener('DOMContentLoaded', function () {

    const onclick =  ()=> {
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'hi',getLinkFromTab)
      })
    }
    document.querySelector('button').addEventListener('click', onclick, false)

    function getLinkFromTab (res) {
    //alert(res.curUrl);
    var URL = "http://localhost:3000?url="+res.curUrl;
    // fetch(URL).then((data)=>{
    //     console.log(data.result);
    //     if(data.error){
    //         alert("Some error occured",data.error);
    //         return;
    //     }
    //     alert(data.result[1]);
    //     document.getElementById("price").innerHTML = result;
    // })
    fetch(URL)
    .then((data)=>{
        data.json().then((response)=>{
            data = response.data;
            document.getElementById("price").innerHTML = data[1];
        })
    });
    //   const div = document.createElement('div')
    //   div.textContent = `${res.curUrl} Rs`
    //   document.body.appendChild(div)
    }
  }, false)