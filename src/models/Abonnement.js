

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('abonnement', {
      id_abonnement: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      titre_repertoire: {
      
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'Le suject ne doit pas être vide'},
          notNull: {msg: 'Le suject  est une propriété requise'}
        }},
     adresse_visiteur: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: `adresse ne doit pas être vide`},
          notNull: {msg: `Votre adresse est obligatoire merci de le renseigner`}
        }
      },    
    }, {
      timestamps: true,
      createdAt: 'date_creation',
      updatedAt: false
    })
  }