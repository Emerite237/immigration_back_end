
const {Pdf}= require('../db/sequelize');
const cors=require("cors")

const supprimer= require("../fonctions/supprimer_image")


module.exports = (app)=>{
    app.delete('/api/pdf/supprimer/:id', cors(), async(req,res)=>{


       Pdf.findOne({ where: {
            id_pdf: req.params.id}}
         )
        .then(Pdf => {
            if(Pdf===null){
                const message="la Pdfs n'existe pas, essayer un autre identifiant "
                return res.status(404).json({message}) 
            }

           

            supprimer.supprimer(Pdf.path )
            const Pdfsdelete=Pdf;
           Pdf.destroy({
                where : id_pdfs=Pdf.id_pdfs
            }).then()
            return  res.json(Pdfsdelete)  
        })

    }
    )}
