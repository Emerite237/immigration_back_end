
const nodemailer=require('nodemailer');

module.exports.send = async function(mail,pseudo,titre_formation) {
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
subject:"Abonnement Reussie 😁" ,
text:  ` Salut  ${pseudo}!\n\n\n` +  `Votre abonnement à la formation ${titre_formation} à été approuvé`
};

try {
        await  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    else {
      console.log("mail envoye:" + pseudo + "       " + info.response);
    }
  })
} catch (error) {
console.error('Une erreur s\'est produite lors de l\'envoi du message :', error);
}
}



