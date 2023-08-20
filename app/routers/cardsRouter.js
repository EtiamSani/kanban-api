// on récupère un routeur express
const { Router } = require('express');
const cardsRouter = Router();
const cardsController = require('../controllers/cardsController');

// ce fichier a été use() par l'app express avec un préfixe "/lists", donc pour gérer l'url "/lists/:id" par exemple, il ne faudra préciser que "/:id".

// route GET '/lists/'
cardsRouter.get('/:cardId/cards', cardsController.getAll);
cardsRouter.get('/:cardId', cardsController.getOne);
cardsRouter.post('/', cardsController.create);
cardsRouter.put('/:cardId', cardsController.update);
cardsRouter.delete('/:cardId', cardsController.delete);
cardsRouter.post('/:cardId/tags', cardsController.addTag);
cardsRouter.delete('/:cardId/tags/:tagId', cardsController.deleteTag);


// on exporte le routeur
module.exports = cardsRouter;