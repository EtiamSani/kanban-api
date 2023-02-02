const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../database');


class Tag extends Sequelize.Model {}

Tag.init(
 
  {
    
    id: DataTypes.INTEGER, // on associe un type à chaque champ
    name: DataTypes.TEXT,
    color: DataTypes.TEXT,

  },
 
  {

    sequelize, 
    tableName: 'tags',
  }
);

// on exporte le modèle pour s'en servir ailleurs
module.exports = Tag;