const { Repertoire }= require('../db/sequelize')
const {Image}= require('../db/sequelize')
const{Video}=require('../db/sequelize')
const cors=require("cors")
const compare=require("lodash")
const enregistrer_image_video= require("../fonctions/modifier_image_video")
const suppression=require("../fonctions/supprimer_image")
const path= require("path")
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')
const requireAuth= require("../auth/isAuthadmin")

var repertoire =require("../models/Repertoire")

const multer =require("multer");

var images = require("../fonctions/modifier_images_payantes")

var tab=[]
var tab1=[]

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
    cb(null,"../../France-Etude/src/assets")
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
    app.put('/api/Repertoire/modifier/:id',requireAuth,upload.any('file') , cors(),(req,res) =>
    {
        const id= req.params.id
        tab1= req.files

        console.log(req.files)
        if( compare.isEqual(tab1,tab)===false){
           

            Image.findOne( {where: {
                id_Repertoire: req.params.id}}) .then(image=> {
                    if(image===null){
                        const message="l'image n'existe pas, essayer un autre identifiant "
                        return res.status(404).json({message}) 
                    }
                    console.log(  "caracteristique du: "+image)
                   suppression.supprimer(image.path)
                    enregistrer_image_video.modifier(req.files,id,null)
                   })

                    

              
}
else 
{
    console.log('yo image doit pas etre supprimer')
}


repertoire= Repertoire.findOne( {where: {
    id_repertoire: req.params.id}})

    if( req.body.titre!=="undefined")
    {
        repertoire.titre=req.body.titre
    } 
    if( req.body.description!=="undefined")
    {
        repertoire.description=req.body.description
    } 
    if( req.body.contenu!=="undefined")
    {
        repertoire.contenu=req.body.contenu
    } 

    if( req.body.prix!=="undefined")
    {
        repertoire.prix=req.body.prix
    } 



      Repertoire.update(repertoire,{
            where: {id_repertoire: id}

        })
        .then(_=>{
        Repertoire.findOne( {where: {
            id_repertoire: req.params.id}}).then(Repertoires => {
                if(Repertoires===null)
                {  
                    console.log(Repertoires)
                    
                    const message="le Repertoires n'existe pas "
                        res.status(404).json({message}) 
                    
                }
                const message='le Repertoires a bien ete modifie.'
                res.json({message})
            })        
        }).catch(error =>{
                const message="le Repertoires n'a pas pue etre modifier,reesayer dans quelques instant"
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
