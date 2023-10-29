
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

        id_formation: {
            type: DataTypes.INTEGER,
            allowNull:false,
           
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