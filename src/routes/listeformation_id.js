const {Formation}= require('../db/sequelize')
const cors= require('cors')


module.exports= (server) => {
   server.get('/api/formation/:id',cors(),async(req,res)=>{

    

    Formation.findOne({
       where: {
      id_formation: req.params.id}
   })
       .then(Formation => {
        
         res.json(Formation )
       })
       .catch(error => {
         const message = `La formation  n'a pas pu être récupérée. Réessayez dans quelques instants.`
         res.status(500).json({message, data:error})
         console.log(error)
       })
   })
}