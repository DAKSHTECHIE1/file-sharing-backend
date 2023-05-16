require('dotenv').config();//to use env variables mentioned in env file
const mongoose=require('mongoose');
function connectDB(){
    mongoose.connect(process.env.MONGO_CONNECTION_URL);
    const connection=mongoose.connection;
    connection.on('error', console.error.bind(console, "Error connecting to MongoDB"));
    connection.once('open',()=>{
        console.log('database connected');
    })
}



module.exports=connectDB;
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/inshare');

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });


// module.exports = db;