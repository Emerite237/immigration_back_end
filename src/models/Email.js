

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('email', {
      id_email: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'Le suject ne doit pas être vide'},
          notNull: {msg: 'Le suject  est une propriété requise'}
        }
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: `mail ne doit pas être vide`},
          notNull: {msg: `Votre mail est obligatoire merci de le renseigner`}
        }
      },
      
      id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate: {
            isInt: {msg:'id utilisateur  est un  entier'},
            notNull:{msg:'cette id utilisateur est requise '}
        }
    },
    
    }, {
      timestamps: true,
      createdAt: 'date_creation',
      updatedAt: false
    })
  }