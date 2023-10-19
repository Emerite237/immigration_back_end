const {User}=require('../db/sequelize')
const {Email}=require('../db/sequelize')
const mail=require('../models/Email')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')
var mails= require("./emailgrouper")





module.exports= (server) => {
server.post('/api/sendmail/:id', async (req,res) =>{

    mail.subject=req.body.subject;
    mail.message=req.body.message;
    mail.id_utilisateur=req.params.id;
   
    var utilisateurs= await  User.findAll({})
   
    Email.create(mail).then(mail=> {


      utilisateurs.forEach(element => {
         if(element.status===0){
              mails.send(element.email,element.pseudo,mail.subject,mail.message)
         }
        
      });
      
     
      return res.json({mail})

    }).catch(error => {
      if(error instanceof ValidationError ){
         console.log(error);
      return res.status(400).json({message: error.message,data: error})
     
     }
     if(error instanceof UniqueConstraintError){
      return res.status(400).json({message: error.message})
     }
     const message="le mail  n'a pas pue etre ajouter"
 
     console.log(error);
     res.status(500).json({message, data:error})
     
  })


  }   )
}