const { Image } = require('../db/sequelize')

const { Video } = require('../db/sequelize')

const image = require("../models/Images")
const video = require("../models/Videos")



module.exports.modifier = async function (file,id, url) {

  /*  image.path= file.path.replace(/\\/g, "/")
   image.titre_formation= titre
   image.nom=file.filename*/
if(file!==null){

    var files= file.map(file=>({path:file.path.replace(/\\/g, "/"),nom:file.originalname}));
  console.log(id)
  for(const items of files){

    console.log(items)
    await Image.update ( items,
        {
            where: {
                id_formation:id
            }
        }
    )
  }
}
  if (url !== null
  ) {
    video.path = url
    video.id_formation = id
   await  Video.update(video,
      {
          where: {
              id_formation:id
          }
      }
  )
  }



  // await Image.bulkCreate(files)


}


