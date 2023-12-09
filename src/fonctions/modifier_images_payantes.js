const { ImagePayante } = require('../db/sequelize')

module.exports.modifier = async function (file,id) {

if(file!==null){
    var files= file.map(file=>({path:file.path.replace(/\\/g, "/"),nom:file.filename}));
  console.log(id)
  for(const items of files){

    console.log(items)
    await ImagePayante.update ( items,
        {
            where: {
                id_formation:id
            }
        }
    )
  }
}
  



  // await Image.bulkCreate(files)


}


