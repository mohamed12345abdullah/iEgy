require('dotenv').config()
const mongoose=require('mongoose');

mongoose.connect(process.env.MONGOURL).then(()=>{console.log(' mongo db is connected');});


const register=async(req,res)=>{
    res.end("register");
}


module.exports={
    register
}