
const {Abonnement}= require('../db/sequelize')
const {User}= require('../db/sequelize')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')
const requireAuth= require("../auth/isAuthadmin")


const cors= require("cors")
const mail=require("../fonctions/email_abonnements")
var utilisateur= require("../models/Users") 

const abonnement = require('../models/Abonnement')


module.exports= (server) => {
   server.post('/api/creation/abonnement'/*,requireAuth*/,cors(),(req,res)=>{
   
    abonnement.titre_repertoire=req.body.titre_repertoire;
    abonnement.adresse_visiteur=req.body.adresse_visiteur;

        utilisateur= User.findOne({ where: {
         email: req.body.adresse_visiteur}})

   
    
   Abonnement.create(abonnement)
    .then(abonnements =>{
       mail.send(abonnement.adresse_visiteur,utilisateur.pseudo,abonnement.titre_formation );
        res.json({abonnements})


    }).catch(error => {
     if(error instanceof ValidationError ){
        console.log(error);
     return res.status(400).json({message: error.message,data: error})
    
    }
    if(error instanceof UniqueConstraintError){
     return res.status(400).json({message: error.message})
    }
    const message="la Abonnements n'a pas pue etre ajouter"

    console.log(error);
    res.status(500).json({message, data:error})
    
 })
 })

    


     
    
}