
module.exports = (sequelize,DataTypes)=> {

    return sequelize.define('imagesacceuil',
    {
           id_images:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: {msg: 'Le nom ne doit pas être vide'},
              notNull: {msg: 'Le nom est une propriété requise'}
            }},
    path:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique:{
           msg: 'ce texte est deja pris' 
        },
        validate:{
          
            notNull:{msg: 'ce path est requise'}
        },
    },
   

},
{
    timestamps:true,
    createdAt:'date_img',
    updatedAt:false
}
    )}