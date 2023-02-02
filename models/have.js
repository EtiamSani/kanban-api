
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../database');


class Have extends Sequelize.Model {}

Have.init(
 
  {
    
    id: DataTypes.INTEGER, // on associe un type à chaque champ
    code_card: DataTypes.INTEGER,
    name: DataTypes.INTEGER,

  },
 
  {

    sequelize, 
    tableName: 'have',
  }
);

// on exporte le modèle pour s'en servir ailleurs
module.exports = Have;