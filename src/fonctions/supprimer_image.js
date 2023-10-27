
const fsi = require('fs');
//const fsv = require('fs');

module.exports.supprimer = async function(filePathimage){

fsi.unlink(filePathimage, (err) => {
  if (err) {
    console.error('Une erreur s\'est produite lors de la suppression du fichier:', err);
  } else {
    console.log('Le fichier image  a été supprimé avec succès !');
  }
});



  
 } 
