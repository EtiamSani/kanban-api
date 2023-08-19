const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

// créer une classe List qui représente la structure de la table "list"
class List extends Model { }

List.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: { 
        type: DataTypes.INTEGER,
        allowNull : false,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName : "list",
    modelName : "List"
});

module.exports = List;