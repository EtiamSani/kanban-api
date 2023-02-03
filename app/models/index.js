
const Card = require('../../models/card');
const List = require('../../models/list');

Tag.hasMany(Card, {
    foreignKey: 'card_code', 
    as: 'cards', // 
});


Card.belongsTo(List, {
    foreignKey: 'code_list',
    as: 'lists',
});


module.exports = { 
  
  Card,  
  List, 
  
};