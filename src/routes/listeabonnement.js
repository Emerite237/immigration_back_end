const {Abonnement}= require('../db/sequelize')
const cors= require('cors')
const requireAuth= require("../auth/isAuth")


module.exports= (server) => {
   server.get('/api/liste/abonnement',requireAuth,cors(),async(req,res)=>{

    

    Abonnement.findOne({

   })
       .then(abonnement => {
        
         res.json(abonnement )
       })
       .catch(error => {
         const message = `Laliste  d'abonnement  n'a pas pu être récupérée. Réessayez dans quelques instants.`
         res.status(500).json({message, data:error})
         console.log(error)
       })
   })
}