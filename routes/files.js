const router=require('express').Router();
const multer=require('multer');
const path=require('path');
const File=require('../models/file.js')
const { v4:uuid4 }=require('uuid');


let storage= multer.diskStorage({
    destination:(req,file,cb)=>cb(null, 'public'),//1st param is error so no error therefore null
    filename:(req,file,cb)=>{//filename should be vrna mix hoke gadabad ho skti
        const uniquename=`${Date.now()}${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        //34568643656-28634624626283.zip
        cb(null,`uploads/${uniquename}`);//1st is error again;

    }
})



let upload=multer({
    storage,//storage:storage
    limit:{fileSize: 1000000*100 }//in bytes 100MB
}).single('myfile')//name attribute hi dena hai only!!!!!
//single file therefore single

router.post('/',function(req,res){//cb fn hai req,res system se aate request and response obj hote jaise event aata in addeventlistener mai
    
    //store file in uploads
       upload(req,res,async(err)=>{
            //validate req.//bcoz upload ke time req mai file de raha hoga system
            if(!req.file)//file is not coming in req
            {
                    return res.json({error:`file not found ${err}`});
            }

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
            console.log('hello');
            const response=await file.save();
            //returning link to  download page 
            //response (link to download page  as response)
            return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`})
            //http://localhost:3000/files/23463hjsdgfgj-234bhjbhbjhb
        })




});

router.post('/send',async function(req,res){

    const {uuid,reciever,sender}=req.body;
    //validation
    if(!uuid||!sender||!reciever){
        return res.status(422).send({error:'all fields are mandatory'})
    }

    //get data from d.b.

    const file=await File.findOne({uuid:uuid});
    if(file.sender)//already sender hai therefore alredy sent to user // replicated mails bhejne se bchane ke liye
    {
        return res.status(422).send({error:'mail already sent'});

    }
    file.sender=sender;
    file.reciever=reciever;
    const response=await file.save();

    //send email
    const sendmail=require('../services/emailservice.js');
    sendmail({
        from:sender,
        to:reciever,
        subject:'inshare file sharing web ap powered by Daksh.corp',
        text:`${sender} has shared a file with you`,
        html:require('../services/emailtemplate')({
            sender:sender,
            downloadlink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size:parseInt(file.size/1000)+'KB',
            expires:'24 hours'
        })
    })
    return res.send({success:true})

})






module.exports=router