
module.exports = (sequelize,DataTypes)=> {

    return sequelize.define('videos',
    {
         
        
        id_videos:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        /*nom: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: {msg: 'Le nom ne doit pas être vide'},
                notNull: {msg: 'Le nom  est une propriété requise'}
              }
        },*/

        titre_formation: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: {msg: 'Le titre ne doit pas être vide'},
                notNull: {msg: 'Le titre  est une propriété requise'}
              }
        },
       
    path:{
        type: DataTypes.TEXT,
        allowNull: false,
       
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