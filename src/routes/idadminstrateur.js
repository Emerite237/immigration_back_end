const {User}= require('../db/sequelize')
const cors= require('cors')



module.exports= (server) => {
   server.get('/api/administrateur',cors(),async(req,res)=>{

    User.findOne({
       where: {
      status: 1}
   })
       .then(user => {
        
         res.json(user.id )
       })
       .catch(error => {
         const message = `La liste des annonces n'a pas pu être récupérée. Réessayez dans quelques instants.`
         res.status(500).json({message, data:error})
         console.log(error)
       })
   })
}