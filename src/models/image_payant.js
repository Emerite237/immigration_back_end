
module.exports = (sequelize,DataTypes)=> {

    return sequelize.define('image_payante',
    {
         
        
        id_images:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_repertoire:{
            type: DataTypes.INTEGER,
            allowNull:false,
           
        },
        nom: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: {msg: 'Le nom ne doit pas être vide'},
                notNull: {msg: 'Le nom  est une propriété requise'}
              }
        },
       
    path:{
        type: DataTypes.TEXT,
       
        unique:{
           msg: 'ce texte est deja pris' 
        },
    
    }, 
     

    
    
    
 
   
   

},
{
    timestamps:true,
    createdAt:'date_img',
    updatedAt:false
}
    )}