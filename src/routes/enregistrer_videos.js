
const {Video}= require('../db/sequelize')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')

const path= require("path")
const multer =require("multer");

const cors= require("cors")


const uploadDir = path.join(__dirname, './public/data/uploads');
//const imagePath = path.join(uploadDir, 'uploads', `${filename}.jpg`);


const  MIME_TYPES={
  "video/mp4" : "mp4",
 }
const storage =multer.diskStorage({
  destination : (req,file,cb)=>
  {
     cb(null,"./public/data/uploads/videos/")
  },
  filename : (req,file,cb)=>{
    const name=file.originalname.split(" ").join("_")
    const extention= MIME_TYPES[file.mimetype]
    
    cb(null, name+ "_"+Date.now()+ "."+extention);
  }
})


 const upload= multer({storage:storage,
  
  }
  ).any('file')



module.exports= (server) => {

  server.post('/api/uploads/video/:id',upload,cors(),async (req,res)=>{
    
    var videos = req.files.map(file=>({path:file.path.replace(/\\/g, "/"),titre_formation:req.params.id}));
    console.log(videos)
    await Video.bulkCreate(videos).then(formations =>{
     
      res.json({videos})
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
  
  

  