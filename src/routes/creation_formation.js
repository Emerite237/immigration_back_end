
const {Formation}= require('../db/sequelize')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')
const requireAuth= require("../auth/isAuthadmin")
const path= require("path")
const multer =require("multer");

const cors= require("cors")

 var images = require("../fonctions/enregistrer_images")

 var tab=[]

const uploadDir = path.join(__dirname, './public/data');
//const imagePath = path.join(uploadDir, 'uploads', `${filename}.jpg`);


const  MIME_TYPES={
  "image/jpg" : "jpg",
  "image/jpeg":"jpg",
  "image/gif":"gif",
  "image/png": "png",
  "image/bmp":"bmp",
  "video/mp4" : "mp4"
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



const formation = require('../models/Formations')


module.exports= (server) => {
   server.post('/api/creation/formation',requireAuth,upload.any('file'),cors(),(req,res)=>{
   
    formation.titre=req.body.titre;
   
    formation.contenu=req.body.contenu
    formation.description=req.body.description;
    console.log( "mes fichiers : ",req.files)
   Formation.create(formation)
    .then(formations =>{
        const message ='le formations a bien ete ajouter.'

        console.log(req.files)
          images.image(req.files,formations.id_formation,req.body.url)

        res.json({message,data: formations})


    }).catch(error => {
     if(error instanceof ValidationError ){
        console.log(error);
     return res.status(400).json({message: error.message,data: error})
    
    }
    if(error instanceof UniqueConstraintError){
     return res.status(400).json({message: error.message})
    }
    const message="la formations n'a pas pue etre ajouter"

    console.log(error);
    res.status(500).json({message, data:error})
    
 })
 })

    


     
    
}