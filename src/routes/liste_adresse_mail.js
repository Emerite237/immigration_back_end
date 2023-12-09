const {User}= require('../db/sequelize')
const cors= require('cors')
const requireAuth= require("../auth/isAuth")

var tabs=[]
module.exports= (server) => {
   server.get('/api/liste/adresse_mail',requireAuth,cors(),async(req,res)=>{

    

    User.findAll({})
       .then(user => {
        
         user.forEach(element => {
            tabs.push(User.email)
         });

         res.json(tabs)
       })
       .catch(error => {
         const message = `La User  n'a pas pu être récupérée. Réessayez dans quelques instants.`
         res.status(500).json({message, data:error})
         console.log(error)
       })
   })
}