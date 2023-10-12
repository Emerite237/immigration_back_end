module.exports = (sequelize, DataTypes) => {
    return sequelize.define('utilisateur', {
      id_utilisateur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{ 
          msg: "Ce speudo est déja pris "
        },
        validate: {
          notEmpty: {msg: 'Le nom ne doit pas être vide'},
          notNull: {msg: 'Le nom est une propriété requise'}
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{ 
          msg: "Cet email est déja pris "
        },
        validate: {
          notEmpty: {msg: `Email ne doit pas être vide`},
          notNull: {msg: `Votre email est obligatoire merci de le renseigner`}
        }
      },
      telephone: {
        type: DataTypes.INTEGER,
      
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {msg: `Erreur de génération d'un status`},
          notNull: {msg: 'Erreur  status non valide'}
        }
      }
    }, {
      timestamps: true,
      createdAt: 'date_creation',
      updatedAt: false
    })
  }