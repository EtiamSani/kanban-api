// impératif pour récupérer les variable d'environnement depuis le fichier .env
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 1337;
const app = express();

// on précise à notre app qu'on va recevoir du JSON
app.use(express.json());

// on "exécute" les associations Sequelize
// une fois que ce fichier a été interprété, il n'y a pas besoin de le refaire
require('./app/models/models');

const listsRouter = require('./app/routers/listsRouter');

// on récupère les routeurs
// quand on précise à notre app quels fichiers de routage utiliser, on peut y associer un préfixe d'url
// => ici on crée un routeur pour chaque ressource, on préfixera donc chaque appel avec l'url qui identifie cette ressource
app.use('/lists', listsRouter);

// middleware 404
app.use((req, res) => {
    // on renvoie un objet avec des précisions sur l'erreur, toujours au format json
    res.status(404).json({
        statusCode: 404,
        message: "Not Found"
    });
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log('http://localhost:' + PORT);
    }
});