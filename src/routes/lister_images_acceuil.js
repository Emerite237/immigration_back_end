const {ImageAcceuil}= require('../db/sequelize')

const cors= require('cors')
module.exports= (server) => {

  
   
   server.get('/api/liste/imageacceuil',cors(),  async(req,res)=>{
     
       ImageAcceuil.findAll({})
       .then(Image =>{
          
       console.log(Image)

       res.json(Image)

       })
       .catch (error =>{
           const message="la liste des Image n'a pas ete recupere,reesayer dans quelques instant"
           res.status(500).json({message,data: error}) 
       })

      
      

     
   }) 
}