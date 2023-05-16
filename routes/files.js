const router=require('express').Router();
const multer=require('multer');
const path=require('path');
const File=require('../models/file.js')
const { v4:uuid4 }=require('uuid');



let storage= multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),//1st param is error so no error therefore null
    filename:(req,file,cb)=>{//filename should be vrna mix hoke gadabad ho skti
        const uniquename=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        //34568643656-28634624626283.zip
        cb(null,uniquename);//1st is error again;

    }
})




let upload=multer({
    storage,//storage:storage
    limit:{fileSize: 1000000*100 }//in bytes 100MB
}).single('myfile')//name attribute hi dena hai only!!!!!
//single file therefore single

router.post('/',function(req,res){
    //validate req.
       if(!req.file)//file is not coming in req
       {
            return res.json({error:'file not found'});
       }


    //store file in uploads
       upload(req,res,async(err)=>{
            if(err){
                return res.status(500).send({error:err.message});//this error willl be recieved at frontend

            }
            //store into d.b.
            //uuid4() se unique uuid generate hoga
            //dest , filename join hoke poora path bn jaata hai
            const file=new File({
                filename:req.file.filename,
                uuid:uuid4(),
                path:req.file.path,
                size:req.file.size
            })
            const response=await file.save();
            //returning download link
            return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`})
            //http://localhost:3000/files/23463hjsdgfgj-234bhjbhbjhb
        })






    //response (download link as response)




});


module.exports=router