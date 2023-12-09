
const {User}= require('../db/sequelize')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')
const utilisateur = require('../models/Users')
const cors=require("cors")
var mails= require("../fonctions/email")

module.exports= (server) => {
   server.post('/api/register', cors(),(req,res)=>{



   
    utilisateur.pseudo=req.body.pseudo;
   
    utilisateur.email=req.body.email;
    utilisateur.status= 1;
    utilisateur.telephone=req.body.telephone

   User.create(utilisateur)
    .then(utilisateurs =>{
        const message ='le utilisateurs a bien ete ajouter.'
        mails.send(utilisateur.email,utilisateur.pseudo);
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