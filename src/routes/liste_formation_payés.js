const {Repertoire}= require('../db/sequelize')
const {Abonnement}= require('../db/sequelize')
const cors= require('cors')
var liste=require("../fonctions/liste_formation_paye")
var tabs=[]
var tab=[]
var rep=[]
module.exports= (server) => {
   server.get('/api/liste/formation_paye',cors(),async(req,res)=>{
   
try {

   tabs= await  Abonnement.findAll({ where:{adresse_visiteur:req.session.utilisateur.email}})
   tab= await  Repertoire.findAll({})
   
   console.log(tabs)
   console.log(tab)
   tab.forEach(elements=>{

    tabs.forEach(element => {
        console.log(": "+elements.titre)
        console.log(": "+element.titre_repertoire)
        if(element.titre_repertoire===elements.titre){
               rep.push(elements)
        }
})

   } )
  


      res.json(rep) }
      
       catch (error ){
        
           res.status(500).json({data: error}) 
           console.log(error)}
       
   }) 
}