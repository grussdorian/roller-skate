localStorage.setItem("test","hello this is the data");
localStorage.re

var data = fetch(targetUrl).then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {
	// This is the HTML from our response as a text string
    myhtml = html;
// 	console.log(html);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
}); 