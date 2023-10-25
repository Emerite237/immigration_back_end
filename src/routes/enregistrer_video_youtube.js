
const {Video}= require('../db/sequelize')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')


const video = require('../models/Videos')
const cors=require("cors")

module.exports= (server) => {
   server.post('/api/creation/videoyoutube/:id',cors(),(req,res)=>{

    video.id_formation=  parseInt (req.params.id);

    

    video.path=req.body.path;

   Video.create(video)
    .then(videos =>{

        res.json({videos})
    }).catch(error => {
     if(error instanceof ValidationError ){
        console.log(error);
     return res.status(400).json({message: error.message,data: error})

    }
    if(error instanceof UniqueConstraintError){
     return res.status(400).json({message: error.message})
    }
    const message="la videos n'a pas pue etre ajouter"

    console.log(error);
    res.status(500).json({message, data:error})

 })
 })






}