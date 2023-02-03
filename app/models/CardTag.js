const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const Card = require('./Card');
const Tag = require('./Tag');

class CardTag extends Model { }

CardTag.init({
    // on nomme les propriétés avec une majuscule pour pouvoir utiliser les méthodes de models générées automatiquement par sequelize => CardId au lieu de cardId
        CardId: {
            type: DataTypes.INTEGER,
            field: 'card_id',
            references: {
                model: Card,
                key: 'id'
            }
        },
        TagId: {
            type: DataTypes.INTEGER,
            field: 'tag_id',
            references: {
                model: Tag,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        tableName: 'card_tag',
        timestamps: false // on décide de ne pas utiliser de timestamps pour ce model
    }
);

module.exports = CardTag;