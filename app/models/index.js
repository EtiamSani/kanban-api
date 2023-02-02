
const Card = require('./Card');
const List = require('./List');

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