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

            console.log(global.isConnected)
            return res.json({'token:':Token.generetedTokenForUser(user),user})
        }
    ).catch(error =>{
        const message =" l' utilisateur n'a pas pue se connecte , reesayer dans quelque instants..."
        console.log(error)
        return res.status(400).json({message, data:error})
    } )

    } )
}