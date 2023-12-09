const { Videos_p } = require('../db/sequelize')





module.exports.Video_p = async function (file,id) {

if(file!==null){
  console.log(id)
  var files = file.map(file => ({ path: file.path.replace(/\\/g, "/"), nom: file.filename, id_repertoire:id}));
  console.log(  "caracteristique: "+files)


  await Videos_p.bulkCreate(files)
}

}


