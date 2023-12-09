const { Image } = require('../db/sequelize')

const { Video } = require('../db/sequelize')

const image = require("../models/Images")
const video = require("../models/Videos")



module.exports.image = async function (file,id, url) {

if(file!==null){
  console.log(id)
  var files = file.map(file => ({ path: file.path.replace(/\\/g, "/"), nom: file.filename, id_formation:id}));
  console.log(  "caracteristique: "+files)


  await Image.bulkCreate(files)
}
  if ((url !== null) ||(url!=="undefined") 
  ) {
    video.path = url
    video.id_formation = id
    Video.create(video)
  }



  // await Image.bulkCreate(files)


}


