const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//path is path to store in uploads
//uuid- an id for each file
//sender,reciever- for emails
//timestamps for created at and updated at
const fileSchema=new Schema({
    filename:{type:String, required:true},
    path:{type:String, required:true},
    size:{type:Number, required:true},
    uuid:{type:String, required:true},
    sender:{type:String, required:false},
    reciever:{type:String, required:false}
},{timestamps:true });
//model name is 1st parameter
module.exports=mongoose.model('File',fileSchema);