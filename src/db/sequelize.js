const Usermodel= require("../models/Users")
const Emailmodel= require("../models/Email")
const Formadtionmodel=require("../models/Formations")
const Videomodel= require("../models/Videos")
const Imagesmodels=require("../models/Images")
const Pdfmodel=require("../models/Pdf")
const Imagesacceuilmodels=require("../models/ImagesAcceuil")

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
const ImageAcceuil=Imagesacceuilmodels(sequelize,DataTypes);

User.hasMany(Email,{
  foreignKey:'id_utilisateur',
  as: 'mail_utilisateur',
  onDelete:'CASCADE',
 
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
  onDelete: 'CASCADE',
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
  onDelete: 'CASCADE',
  hooks:true
})




Formation.hasMany(Pdf,{
  foreignKey:'id_formation',
  as: 'pdf_formation',
  onDelete:'CASCADE'
})

Pdf.belongsTo(Formation,{
  foreignKey: 'id_formation',
  as: 'pdf_formation',
  onDelete: 'CASCADE',
  hooks:true
})




const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
      console.log('La base de donnée a bien été initialisée !')
    })
  }
    
  
  module.exports = { 
   sequelize,User,Email,Formation,Video,Image,Pdf,ImageAcceuil
  }