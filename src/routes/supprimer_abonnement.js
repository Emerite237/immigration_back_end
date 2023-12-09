const {Abonnement}= require('../db/sequelize');
const cors=require("cors")

module.exports = (app)=>{
    app.delete('/api/abonnement/supprimer/:id', cors(),(req,res)=>{
        Abonnement.findOne({ where: {
            id_abonnements: req.params.id}}
         )
        .then(abonnement => {
            if(abonnement===null){
                
                const message="le Abonnements n'existe pas, essayer un autre identifiant "
                return res.status(404).json({message}) 
            }
            const abonnementsdelete=abonnement;
            abonnement.destroy({
                where : id=abonnement.id
            }).then()
            return  res.json( abonnementsdelete) 
        })

    })
}