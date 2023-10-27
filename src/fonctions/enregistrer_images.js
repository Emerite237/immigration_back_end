const {Image}= require('../db/sequelize')

const {Video}= require('../db/sequelize')

const image= require("../models/Images")
const video= require("../models/Videos")



module.exports.image = async function(file,titre,url){
  
       image.path= file.path.replace(/\\/g, "/")
      image.titre_formation= titre
      image.nom=file.filename
       
      video.path=url
      video.titre_formation=titre

      console.log(image)
    
      Image.create(image)
      Video.create(video)
  
    // await Image.bulkCreate(files)

     
    } 
  

  