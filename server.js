const express= require('express');
const app=express();
const port=process.env.port||8000;
const connectDB=require('./config/mongoose.js');
connectDB();


app.use('/api/files',require('./routes/files'));


app.listen(port,function(){
    console.log('port is running at port no.',port);
})