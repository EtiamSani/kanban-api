// on récupère un routeur express
const { Router } = require('express');
const tagsRouter = Router();
const tagsController = require('../controllers/tagsController');

// ce fichier a été use() par l'app express avec un préfixe "/lists", donc pour gérer l'url "/lists/:id" par exemple, il ne faudra préciser que "/:id".

// route GET '/lists/'
tagsRouter.get('/', tagsController.getAll);
// tagsRouter.get('/:cardId', tagsController.getOne);
tagsRouter.post('/', tagsController.create);
tagsRouter.put('/:tagId', tagsController.update);
tagsRouter.delete('/:tagId', tagsController.delete);
tagsRouter.post('/cards/:cardId/tag', tagsController.creatTagInCard);
// tagsRouter.delete('/cards/:cardId/tag/:tag_id', tagsController.findCardByTag);




// on exporte le routeur
module.exports = tagsRouter;