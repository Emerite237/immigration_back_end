const Usermodel= require("../models/Users")
const Emailmodel= require("../models/Email")
const Formadtionmodel=require("../models/Formations")
const Videomodel= require("../models/Videos")
const Imagesmodels=require("../models/Images")
const Pdfmodel=require("../models/Pdf")
const Imagepayantemodels=require("../models/image_payant")
const Repertoiremodels=require("../models/Repertoire")
const Video_uploadsmodels= require("../models/Videos_upload")
const Abonnementmodels=require("../models/Abonnement")



const { Sequelize, DataTypes } = require('sequelize')

  
const sequelize = new Sequelize('bd', 'root', '', {
  host: 'bd.sqlite',
  dialect: 'sqlite',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging:true
})

const Pdf=Pdfmodel(sequelize,DataTypes);
const Video=Videomodel(sequelize,DataTypes);
const Image=Imagesmodels(sequelize,DataTypes);
const User=Usermodel(sequelize,DataTypes);
const Email=Emailmodel(sequelize,DataTypes);
const Formation=Formadtionmodel(sequelize,DataTypes);
const ImagePayante=Imagepayantemodels(sequelize,DataTypes);
const Repertoire=Repertoiremodels(sequelize,DataTypes);
const Videos_upload= Video_uploadsmodels(sequelize,DataTypes);
const Abonnement= Abonnementmodels(sequelize,DataTypes);




Repertoire.hasMany(Videos_upload,{
  foreignKey: "id_formation",
  as: 'video_uploads',
  onDelete: 'CASCADE'
})

Videos_upload.belongsTo(Repertoire,{
  foreignKey: 'id_formation',
  as: "video_upload",
 
})

User.hasMany(Email,{
  foreignKey:'id_utilisateur',
  as: 'mail_utilisateur',
hooks: true
 
})
Email.belongsTo(User,{
  foreignKey: 'id_utilisateur',
  as: 'mail_utilisateur',
  onDelete: 'CASCADE',
  hooks:true
})


Formation.hasMany(Video,{
  foreignKey:'id_formation',
  as: 'video_formation',
  onDelete:'CASCADE'
})

Video.belongsTo(Formation,{
  foreignKey: 'id_formation',
  as: 'video_formation',
  
  hooks:true
})



Formation.hasMany(Image,{
  foreignKey:'id_formation',
  as: 'image_formation',
  onDelete:'CASCADE'
})

Image.belongsTo(Formation,{
  foreignKey: 'id_formation',
  as: 'image_formation',
 
  hooks:true
})


Repertoire.hasMany(ImagePayante,{
  foreignKey:'id_repertoire',
  as: 'image_repertoire',
  onDelete:'CASCADE'
})

ImagePayante.belongsTo(Repertoire,{
  foreignKey: 'id_repertoire',
  as: 'image_formation',
 
  hooks:true
})




Formation.hasMany(Pdf,{
  foreignKey:'id_formation',
  as: 'pdf_formation',
  onDelete:'CASCADE'
})

Pdf.belongsTo(Formation,{
  foreignKey: 'titre_formation',
  as: 'pdf_formation',
 
  hooks:true
})




const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
      console.log('La base de donnée a bien été initialisée !')
    })
  }
    
  
  module.exports = { 
   sequelize,User,Email,Formation,Video,Image,Pdf,ImagePayante,Repertoire,Videos_upload,Abonnement
  }