const {Image}= require('../db/sequelize')

const cors= require('cors')
module.exports= (server) => {

  
   
   server.get('/api/image/:id',cors(),  async(req,res)=>{
     
       Image.findAll({
        where: {
            titre_formation: req.params.id}
         
  })
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