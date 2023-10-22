const {Image}= require('../db/sequelize')

const cors= require('cors')
module.exports= (server) => {

  
   
   server.get('/api/liste/imagecomplet',cors(),  async(req,res)=>{
     
       Image.findAll({})
       .then(Images =>{
          
       console.log(Images)

       res.json(Images)

       })
       .catch (error =>{
           const message="la liste des Image n'a pas ete recupere,reesayer dans quelques instant"
           res.status(500).json({message,data: error}) 
       })

      
      

     
   }) 
}