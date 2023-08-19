// doc de sequelize pour la définition des associations : https://sequelize.org/docs/v6/core-concepts/assocs/
const Card = require('./Card');
const List = require('./List');
const Tag = require('./Tag');
const CardTag = require('./CardTag');

// relation Card <= N:1 => List
List.hasMany(Card, {foreignKey: 'list_id'});
Card.belongsTo(List, {foreignKey: 'list_id'});

// relation Card <= N:N => Tag
// dans les relations many to many, les deux entités ont un belongsToMany()
Tag.belongsToMany(Card, {through: CardTag});
Card.belongsToMany(Tag, {through: CardTag});