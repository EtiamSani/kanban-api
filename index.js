// impératif pour récupérer les variable d'environnement depuis le fichier .env
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 1337;
const app = express();
const listsRouter = require('./app/routers/listsRouter');

// on récupère les routeurs
// quand on précise à notre app quels fichiers de routage utiliser, on peut y associer un préfixe d'url
// => ici on crée un routeur pour chaque ressource, on préfixera donc chaque appel avec l'url qui identifie cette ressource
app.use('/lists', listsRouter);

app.listen(PORT, (err) => {
    if (!err) {
        console.log('http://localhost:' + PORT);
    }
});