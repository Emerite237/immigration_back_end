
const nodemailer=require('nodemailer');
module.exports.send = async function(mail,pseudo) {


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.email',
 service:"gmail",
 secure:false,
  auth: {
    user: 'franckemerites45@gmail.com',
    pass: 'ufwf pqhm jahh bcud'
  }
  });
const mailOptions = {
  from: 'franckemerites45@gmail.com',
  to: mail,
  subject: "Confirmation d'inscription",
  text:  `Félicitation ${pseudo} votre inscription a ete confirme dans le site France-etude . `
};

         transporter.sendMail(mailOptions,function (error,info){
          if(error){
          console.log(error);
          }
          else{
            console.log("mail envoye"+ info.response);
          }})


  /*
   
    /*

 */
} 
