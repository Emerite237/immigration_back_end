const {Formation}= require('../db/sequelize')
const cors= require('cors')
const requireAuth= require("../auth/isAuth")

module.exports= (server) => {
   server.get('/api/liste/formation',requireAuth,cors(),async(req,res,next)=>{
   
try {

   var Formations= await  Formation.findAll({})
      
      res.json(Formations) }
      
       catch (error ){
        
           res.status(500).json({data: error}) 
           console.log(error)}
       
   }) 
}