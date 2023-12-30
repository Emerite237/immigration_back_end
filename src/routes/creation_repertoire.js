
const {Repertoire}= require('../db/sequelize')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')
const path= require("path")
const multer =require("multer");

const cors= require("cors")

 var images = require("../fonctions/enregistrer_image_payante")

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



const repertoire = require('../models/Repertoire')


module.exports= (server) => {
   server.post('/api/creation/repertoire',upload.any('file'),cors(),(req,res)=>{
   
    repertoire.titre=req.body.titre;
   
    repertoire.contenu=req.body.contenu
    repertoire.description=req.body.description;
    repertoire.prix=req.body.prix;
   
    
   Repertoire.create(repertoire)
    .then(repertoires =>{
        const message ='le Repertoires a bien ete ajouter.'

       
          images.image(req.files,repertoires.id_repertoire,req.body.url)

        res.json({message,data:repertoires})


    }).catch(error => {
     if(error instanceof ValidationError ){
        console.log(error);
     return res.status(400).json({message: error.message,data: error})
    
    }
    if(error instanceof UniqueConstraintError){
     return res.status(400).json({message: error.message})
    }
    const message="la Repertoires n'a pas pue etre ajouter"

    console.log(error);
    res.status(500).json({message, data:error})
    
 })
 })

    


     
    
}