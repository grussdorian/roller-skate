// alert("working");
chrome.runtime.onMessage.addListener(function (request,sender,sendResponse) {
  const re = new RegExp('ring', 'gi')
  var matches = document.documentElement.innerHTML.match(re)
  sendResponse({count: matches.length})
  //alert(request)
})

// const re = new RegExp('bear', 'gi')
// const matches = document.documentElement.innerHTML.match(re) || []

// chrome.runtime.sendMessage({
//   url: window.location.href,
//   count: matches.length
// })