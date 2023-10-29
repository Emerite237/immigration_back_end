const { Formation }= require('../db/sequelize')
const {Image}= require('../db/sequelize')
const{Video}=require('../db/sequelize')
const cors=require("cors")
const enregistrer_image_video= require("../fonctions/modifier_image_video")
const suppression=require("../fonctions/supprimer_image")
const path= require("path")
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')

var formation =require("../models/Formations")

const multer =require("multer");

var images = require("../fonctions/modifier_image_video")

var tab=[]

const uploadDir = path.join(__dirname, './public/data');
//const imagePath = path.join(uploadDir, 'uploads', `${filename}.jpg`);


const  MIME_TYPES={
 "image/jpg" : "jpg",
 "image/jpeg":"jpg",
 "image/gif":"gif",
 "image/png": "png",
 "image/bmp":"bmp"
}


const storage =multer.diskStorage({
 destination : (req,file,cb)=>
 {
    cb(null,"./public/data/uploads/images")
 },
 filename : (req,file,cb)=>{
   const name=file.originalname.split(" ").join("_")
   const extention= MIME_TYPES[file.mimetype]

   

    cb(null, name+ "_"+Date.now()+ "."+extention);
 }
})


const upload= multer({storage:storage,
 

 }
 )

module.exports =(app) =>{
    app.put('/api/formation/modifier/:id', upload.any('file') , cors(),(req,res) =>
    {
        const id= req.params.id

        if(req.files!=="undefined"){

            Image.findOne( {where: {
                id_formation: req.params.id}}) .then(image=> {
                    if(image===null){
                        const message="l'image n'existe pas, essayer un autre identifiant "
                        return res.status(404).json({message}) 
                    }
                    console.log(  "caracteristique du: "+image)
                    suppression.supprimer(image.path)
                    enregistrer_image_video.modifier(req.files,id,null)
                   })

                    

              
}


if(req.body.url!=="undefined"){
      
    Video.findOne( {where: {
        id_formation: req.params.id}}) .then(video=> {
            if(video===null){
                const message="la video n'existe pas, essayer un autre identifiant "
                return res.status(404).json({message}) 
            }
            enregistrer_image_video.modifier(null,id,req.body.url)
          })

    

}

formation= Formation.findOne( {where: {
    id_formation: req.params.id}})

    if( req.body.titre!=="undefined")
    {
        formation.titre=req.body.titre
    } 
    if( req.body.description!=="undefined")
    {
        formation.titre=req.body.description
    } 
    if( req.body.contenu!=="undefined")
    {
        formation.titre=req.body.contenu
    } 



      Formation.update(formation,{
            where: {id_formation: id}

        })
        .then(_=>{
        Formation.findOne( {where: {
            id_formation: req.params.id}}).then(Formations => {
                if(Formations===null)
                {  
                    console.log(Formations)
                    
                    const message="le Formations n'existe pas "
                        res.status(404).json({message}) 
                    
                }
                const message='le Formations a bien ete modifie.'
                res.json({message})
            })
        
            

            Formation.findOne( {where: {
                id_formation: req.params.id}}).then(Formations => {
                    if(Formations===null)
                    {  
                        console.log(Formations)
                        
                        const message="le Formations n'existe pas "
                            res.status(404).json({message}) 
                        
                    }
                    
                })
            
                

        
        
        
        
        
        }).catch(error =>{
                const message="le Formations n'a pas pue etre modifier,reesayer dans quelques instant"
                console.log(error)
                res.status(500).json({message,data: error}) 
               
            }).catch(error => {
                if(error instanceof ValidationError ){
                return res.status(400).json({message: error.message,data: error})
               }
               if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message})
               }
               
            })
        })
    }
