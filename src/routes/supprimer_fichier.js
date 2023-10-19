
//const 
const fs = require('fs');



const filePath = '/chemin/vers/ton/fichier.txt';

fs.unlink(filePath, (err) => {
  if (err) {
    console.error('Une erreur s\'est produite lors de la suppression du fichier:', err);
  } else {
    console.log('Le fichier a été supprimé avec succès !');
  }
});