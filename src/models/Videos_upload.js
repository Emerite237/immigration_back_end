
module.exports = (sequelize,DataTypes)=> {

    return sequelize.define('videos_uploads',
    {
         
        
        id_videos:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

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