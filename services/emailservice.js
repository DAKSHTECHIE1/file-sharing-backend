const nodemailer=require('nodemailer');
//html ya text ek koi use hoga
//custom send mail hmari apni 
async function sendmail({from,to,subject,text,html}){
    let transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    });
//THIS SEND MAIL IS OF nodemailer inbuilt
//all same key-value pairs therefore all using shorthand except 1st
    let info=await transporter.sendMail({
        from:`Inshare <${from}>`,
        to,
        subject,
        text,
        html
    })



}


module.exports=sendmail;