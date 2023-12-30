const {Formation}= require('../db/sequelize')
const cors= require('cors')

module.exports= (server) => {
   server.get('/api/liste/formation/',cors(),async(req,res)=>{
   
try {

   var Formations= await  Formation.findAll({})
      
      res.json(Formations) }
      
       catch (error ){
        
           res.status(500).json({data: error}) 
           console.log(error)}
       
   }) 
}