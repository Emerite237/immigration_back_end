const {Repertoire} = require('../db/sequelize')

var tab=[]

 
module.exports.liste=  async function(tabs,mail){


    tabs.forEach(element => {

        console.log( "nous avons "+element.titre_repertoire)
       // tab= await Repertoire.findAll({})

    tab.forEach(element =>{
        console.log( "tab"+element)
    })
       

      });
   


}