const {User} =require('../db/sequelize');
const jwt =require('jsonwebtoken');
const Token=require('../db/auth/auth');


module.exports= (app) => {

    app.post('/api/login',(req,res)=>{
    
    User.findOne({ where: {pseudo: req.body.pseudo} }).then( user =>{

        if(user === null){
            const message = `speudo incorrect`
            return res.status(404).json({message})
          }

         
            global.isConnected=true
         
          req.session.utilisateur= user;



            

          
            return res.json({user})
        }
    ).catch(error =>{
        const message =" l' utilisateur n'a pas pue se connecte , reesayer dans quelque instants..."
        console.log(error)
        return res.status(400).json({message, data:error})
    } )

    } )

    // Route pour la déconnexion
app.get('/api/logout', (req, res) => {

  var  objet = {
    message:'deconnexion reussie'
   }
       req.session.destroy();
    
    res.json({objet});
  });


  app.get('/api/admin/logout', (req, res) => {
   var  objet = {
    message:'deconnexion reussie'
   }
    req.session.destroy();
   
    res.json({objet});
  });
}