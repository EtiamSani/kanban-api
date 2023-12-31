// on récupère un routeur express
const { Router } = require('express');
const listsRouter = Router();
const listsController = require('../controllers/listsController');

// ce fichier a été use() par l'app express avec un préfixe "/lists", donc pour gérer l'url "/lists/:id" par exemple, il ne faudra préciser que "/:id".

// route GET '/lists/'
listsRouter.get('/', listsController.getAll);
listsRouter.get('/:listId', listsController.getOne);
listsRouter.post('/', listsController.create);
listsRouter.put('/:listId', listsController.update);
listsRouter.delete('/:listId', listsController.delete);

// on exporte le routeur
module.exports = listsRouter;