const {User} =require('../db/sequelize');
const jwt =require('jsonwebtoken');
const Token=require('../db/auth/auth');
const session = require('express-session')


const requireAuth = (req, res, next) => {
    if (req.session.utilisateur) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }

module.exports= (app) => {

    app.post('/api/login',(req,res)=>{
    
    User.findOne({ where: {pseudo: req.body.pseudo} }).then( user =>{

        if(user === null){
            const message = `speudo incorrect`
            return res.status(404).json({message})
          }

          if(user.status===1){
            req.session.utilisateuradmin= user.id_utilisateur;
            global.isConnected=true
            console.log(global.isConnected)
          }

          req.session.utilisateur= user.id_utilisateur;



            

          
            return res.json({'token:':Token.generetedTokenForUser(user),user})
        }
    ).catch(error =>{
        const message =" l' utilisateur n'a pas pue se connecte , reesayer dans quelque instants..."
        console.log(error)
        return res.status(400).json({message, data:error})
    } )

    } )

    // Route pour la déconnexion
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send('deconnection reussie ');
  });


  app.post('/api/admin/logout', (req, res) => {
    global.isConnected=false
    req.session.destroy();
    res.send('deconnection reussie ');
  });
}