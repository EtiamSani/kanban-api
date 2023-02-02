
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../database');


class Card extends Sequelize.Model {}

Card.init(
 
  {
    
    id: DataTypes.INTEGER, // on associe un type à chaque champ
    description: DataTypes.TEXT,
    color: DataTypes.TEXT,
    position: DataTypes.STRING,
    code_list: DataTypes.INTEGER,
  },
 
  {

    sequelize, 
    tableName: 'cards',
  }
);

// on exporte le modèle pour s'en servir ailleurs
module.exports = Card;