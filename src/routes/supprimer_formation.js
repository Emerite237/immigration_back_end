const {Formation}= require('../db/sequelize');
const {Image}= require('../db/sequelize');
const {Video}= require('../db/sequelize');

const cors=require("cors")

const supprimer= require("../fonctions/supprimer_image")


module.exports = (app)=>{
    app.delete('/api/formation/supprimer/:id', cors(), async(req,res)=>{


      
      var i=   Image.findOne({
        where:{ titre_formation:req.params.id }
      }) .then(Images =>{
    
        console.log(Images)
        supprimer.supprimer(Images.path )

         })

     

        Formation.findOne({ where: {
            titre: req.params.id}}
         )
        .then(Formation => {
            if(Formation===null){
                const message="le Formations n'existe pas, essayer un autre identifiant "
                return res.status(404).json({message}) 
            }

           

           //
            const Formationsdelete=Formation;
            Formation.destroy({
                where : id=Formation.titre
            }).then()
            return  res.json( Formationsdelete)  
        })

    })
}