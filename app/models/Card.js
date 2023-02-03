const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

// créer une classe Card qui représente la structure de la table "card"
class Card extends Model { }

Card.init({
    description: { 
        type : DataTypes.TEXT,
        allowNull : false,
    },
    position: { 
        type: DataTypes.INTEGER,
        allowNull : false,
        defaultValue: 0
    },
    color: { 
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName : "card",
    modelName : "Card"
});

module.exports = Card;