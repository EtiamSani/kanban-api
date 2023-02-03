// récupérer les infos du .env dans process.env
require('dotenv').config();
// on récupère les associations entre les models

// on exécute les relations entre les models
const models = require('./app/models/models');
// on récupère nos models
const List = require('./app/models/List');
const Card = require('./app/models/Card');
const Tag = require('./app/models/Tag');

// afficher toutes les listes avec leurs Cards
List.findByPk(1, {
    include: Card
}).then((lists) => {
    console.log(lists);
});


// récupérer tous les tags d'une card
Card.findByPk(2, {include: Tag}).then(console.log);