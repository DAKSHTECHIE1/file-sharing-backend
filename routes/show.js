const router=require('express').Router();
const File=require('../models/file');



router.get('/:uuid',async function(req,res){
    try{
        const file=await File.findOne({uuid:req.params.uuid});
        if(!file){
            return res.render('download',{
                error:'file not found in database'
            })
        }
        return res.render('download',{
            uuid:file.uuid,
            filename:file.filename,
            filesize:file.size,
            download:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
            linker:process.env.APP_BASE_URL
        })
    
    }catch(err){
        return res.render('download',{
            error:'something went wrong'
        })
    }
    
})





module.exports=router;