const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

// créer une classe Tag qui représente la structure de la table "tag"
class Tag extends Model { }

Tag.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    color: { 
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName : "tag",
    modelName : "Tag"
});

module.exports = Tag;