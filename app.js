require('dotenv').config();
const express=require('express');
const app=express();

const clientRouter=require('./router/clientRouter')

app.use("/client",clientRouter);







app.listen(process.env.PORT||3000,()=>{
    console.log(` server start and listen to port ${process.env.PORT}`);
})

