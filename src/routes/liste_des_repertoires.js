const {Repertoire}= require('../db/sequelize')
const cors= require('cors')

module.exports= (server) => {
   server.get('/api/liste/repertoire',cors(),async(req,res)=>{
   
try {

   var Repertoires= await  Repertoire.findAll()
      
      res.json(Repertoires) }
      
       catch (error ){
        
           res.status(500).json({data: error}) 
           console.log(error)}
       
   }) 
}