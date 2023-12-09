const {Repertoire}= require('../db/sequelize');
const {ImagePayante}= require('../db/sequelize');
const {Videos_upload}= require('../db/sequelize');
const requireAuth= require("../auth/isAuthadmin")
const cors=require("cors")

const supprimer= require("../fonctions/supprimer_image")

 var tab=[]
module.exports = (app)=>{
    app.delete('/api/repertoire/supprimer/:id',requireAuth, cors(), async(req,res)=>{


      
       ImagePayante.findOne({
        where: {
            id_repertoire: req.params.id}
      }) .then(Images =>{
    
        console.log(Images)
        supprimer.supprimer(Images.path )

         })


       tab= Videos_upload.findAll({ where: {
            id_repertoire: req.params.id}})

       tab.forEach(element => {
            supprimer.supprimer(element.path)
       });


        Repertoire.findOne({ where: {
            id_repertoire: req.params.id}}
         )
        .then(repertoire => {
            if(repertoire===null){
                const message="le repertoires n'existe pas, essayer un autre identifiant "
                return res.status(404).json({message}) 
            }

           

           //
            const repertoiresdelete=repertoire;
            repertoire.destroy({
                where : id_repertoire=repertoire.id_repertoire
            }).then()
            return  res.json( repertoiresdelete)  
        })

    })
}