
const {User}= require('../db/sequelize')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')
const utilisateur = require('../models/Users')
const cors=require("cors")
var mails= require("./email")

module.exports= (server) => {
   server.post('/api/register', cors(),(req,res)=>{



   
    utilisateur.speudo=req.body.speudo;
   
    utilisateur.email=req.body.email;
    utilisateur.status= 0;
    utilisateur.telephone=req.body.telephone

   User.create(utilisateur)
    .then(utilisateurs =>{
        const message ='le utilisateurs a bien ete ajouter.'
        mails.send(utilisateur.email);
        res.json({message,data: utilisateurs})
    }).catch(error => {
     if(error instanceof ValidationError ){
        console.log(error);
     return res.status(400).json({message: error.message,data: error})
    
    }
    if(error instanceof UniqueConstraintError){
     return res.status(400).json({message: error.message})
    }
    const message="le utilisateurs n'a pas pue etre ajouter"

    console.log(error);
    res.status(500).json({message, data:error})
    
 })
 })

    


     
    
}