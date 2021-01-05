require('dotenv').config()
const express = require('express');
const cors = require('cors');
const scrapper = require('./driver-code');
// const initialize = require('./init');

const app = express();
app.use(cors());

const port = process.env.PORT || 2021;
app.get('/',(req,res)=>{
    scrapper(req.query.url,(error,result)=>{
        if(error){
            return res.send({error:error})
        }
        // return res.json({res:"test"});
        return res.send(result);
        // return res.send({
        //     result:result
        // })
    });
})
app.listen(port,()=>{
    console.log(`app running on port ${port}`);
})