const {Formation}= require('../db/sequelize')
const cors= require('cors')


var tabs=[]
module.exports= (server) => {
   server.get('/api/liste/titre_formation',cors(),async(req,res)=>{

    

    Formation.findAll({})
       .then(formation => {
        
         formation.forEach(element => {
            tabs.push(formation.titre)
         });

         res.json(tabs)
       })
       .catch(error => {
         const message = `La formation  n'a pas pu être récupérée. Réessayez dans quelques instants.`
         res.status(500).json({message, data:error})
         console.log(error)
       })
   })
}