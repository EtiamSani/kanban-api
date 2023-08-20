// impératif pour récupérer les variable d'environnement depuis le fichier .env
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 1337;
const cors = require('cors');
const app = express();
const multer = require('multer');
const bodyParser = multer();
const path = require("path")

app.use(express.static('assets'))

// il faut que notre API 

// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !
app.use( bodyParser.none() );
// on précise à notre app qu'on va recevoir du JSON
app.use(express.json());

// on autorise les requêtes depuis d'autres domaines que celui de notre API
// important => appeler ce middleware avant le routeur
app.use(cors());

// on "exécute" les associations Sequelize
// une fois que ce fichier a été interprété, il n'y a pas besoin de le refaire
require('./app/models/models');

const listsRouter = require('./app/routers/listsRouter');
const cardsRouter = require('./app/routers/cardsRouter');
const tagsRouter = require('./app/routers/tagsRouter');



app.get('/',(requete,reponse) => {
    const chemin = path.join(__dirname,"index.html")
    reponse.sendFile(chemin)
})

// on récupère les routeurs
// quand on précise à notre app quels fichiers de routage utiliser, on peut y associer un préfixe d'url
// => ici on crée un routeur pour chaque ressource, on préfixera donc chaque appel avec l'url qui identifie cette ressource
app.use('/lists', listsRouter);
app.use('/cards', cardsRouter);
app.use('/tags', tagsRouter);

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