// récupérer les infos du .env dans process.env
require('dotenv').config();
// on récupère nos models
const List = require('./models');

// afficher toutes les listes
List.findAll().then((lists) => {
    console.log(lists);
});