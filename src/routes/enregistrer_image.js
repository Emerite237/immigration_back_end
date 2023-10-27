const {ImageAcceuil}= require('../db/sequelize')
const path= require("path")
const multer =require("multer");

const cors= require("cors")

 var images = new Array()

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
  ).any('file')



module.exports= (server) => {
  
  var c=0
  server.post('/api/uploads/image',upload,cors(),async (req,res)=>{
    //const extention= MIME_TYPES[file.mimetype]
  
var files= req.files.map(file=>({path:file.path.replace(/\\/g, "/"),nom:file.originalname}));
     
      console.log(upload.file)
     await ImageAcceuil.bulkCreate(files)

        res.status(200).send({message:" image(s) a(ont) ete upload"})
    })

 }
  
  

  