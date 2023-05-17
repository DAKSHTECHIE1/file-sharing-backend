const express= require('express');
const app=express();
const path=require('path');
const port=3000;
const connectDB=require('./config/mongoose.js');
connectDB();

app.use(express.static('public'));
//by default express server json data recieve nhi krta hai explicitly btana hota hai ki hum json data bhej rahe hai ussey recieve kro!!!!!!!!!!
//ab json data parse kr payega
app.use(express.json());
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

// to manage upload page
app.use('/api/files',require('./routes/files.js'));
//to manage download page
app.use('/files',require('./routes/show'));
//to download krne ke liye koi to route dena hoga jaha link jaye after clicking download on download page
app.use('/files/download',require('./routes/download'));


app.get('/',function(req,res){
    return res.send("<h1>ahahahhzzahahahahaa</h1>")
})



app.listen(port,function(){
    console.log('port is running at port no.',port);
})