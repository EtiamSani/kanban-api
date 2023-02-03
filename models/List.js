
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../app/models');


class List extends Sequelize.Model {}

List.init(
 
  {
    
    id: DataTypes.INTEGER, // on associe un type à chaque champ
    name: DataTypes.TEXT,
    position: DataTypes.TEXT,

  },
 
  {

    sequelize, 
    tableName: 'lists',
  }
);

// on exporte le modèle pour s'en servir ailleurs
module.exports = List;