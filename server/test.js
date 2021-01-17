const express = require('express');
const app = express();
var busy = false;

const a = ()=>{
	console.log("A");
}
const b = ()=>{
	console.log("B");
}
a();
setTimeout(b,3000);
console.log("hui hui");
app.get('/',(req,res)=>{
	res.send('<h1>ok<h1>');
})
app.listen(3000,()=>console.log("server"));