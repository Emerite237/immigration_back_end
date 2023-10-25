

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('formation', {
   
      titre: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg: 'ce titre est deja pris' 
       },
        validate: {
          notEmpty: {msg: 'Le suject ne doit pas être vide'},
          notNull: {msg: 'Le suject  est une propriété requise'}
        }},
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: `description ne doit pas être vide`},
          notNull: {msg: `Votre description est obligatoire merci de le renseigner`}
        }
      },
      contenu :{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: `contenu ne doit pas être vide`},
          notNull: {msg: `Votre contenu est obligatoire merci de le renseigner`}
        }
      },
    
     
    }, {
      timestamps: true,
      createdAt: 'date_creation',
      updatedAt: false
    })
  }