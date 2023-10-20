const express = require('express');
const multer = require('multer');


// Configuration de Multer
const storage = multer.diskStorage({
    destination : (req,file,cb)=>
    {
       cb(null,"../France-Etude/src/assets")
    },
  
  filename: (req, file, cb) => {
    const name=file.originalname.split(" ").join("_")
    const extention= "pdf"

    

     cb(null, name+ "_"+Date.now()+ "."+extention);
  }
});

const upload = multer({ storage }).any('file');



module.exports= (app) => {
  
// Route pour télécharger le fichier
app.post('/api/uploads/pdf/:id',upload,async (req,res)=> {
    var videos = req.files.map(file=>({path:file.path.replace(/\\/g, "/"),id_formation:req.params.id,nom:file.originalname}));
    console.log(videos)


  res.send('Le fichier a été téléchargé et enregistré avec succès.');
});
}