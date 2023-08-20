const Card = require('../models/Card');
const Tag = require('../models/Tag');
const List = require('../models/List');




const cardController = {
     // contrôleur pour la route /cards/
     getAll: async (req, res) => {
        // récupérer les données => models
        const allCards = await Card.findAll(
             // On cherche toutes les cards
        {
            where: { // toutes les cards qui possèdent un list_id = params.id
              list_id: listId
            },
            include: 'tags', // On incclue pour chaque card l'association "tags"
            order: [
              ['position', 'ASC'] // On trie par position ascendante
            ]
          }
        );
        // renvoyer les données au format JSON
        res.json(allCards);
    }, 
    getOne: async (req, res, next) => {
        const cardId = Number(req.params.cardId);

        try {
            const card = await Card.findByPk(cardId, {
                include: 'tags', // Pour cette card on inclue l'association tags, donc tous les tags qui concernent cette carte
        order: [
          ['position', 'ASC']
        ]
            });

            if (!card) {
                next();
                return;
            }

            res.json(card);
        } catch(err) {
            errors.error500(res, err);
        }
    }, 
    create: async (req, res, next) => {
        // il faut récupérer le name passé dans le body de la requête
        // pour éviter l'erreur Cannot read properties of undefined (reading 'name'), il faut penser à déclarer l'usage du middleware express.json() dans index.js
        const description = req.body.title;
        const list_id = req.body.list_id;
        const position = req.body.position
        const color = req.body.color;
        
        console.log('ici',description)
        // important : étape de validation, on renvoie une erreur 400 si on n'est pas content de ce que l'utilisateur nous a envoyé
        // typeof renvoie sous forme de string le type de l'élément analysé
        // ici name doit être une string et faire plus de 1 caractère
        if (typeof description != 'string' || description.length < 2) {
            res.status(400).json({
                statusCode: 400,
                message: "Bad request"
            });
        }

        try {
            // générer un model avec ce name
            // on passe à create() un objet qui contient les propriétés nécessaires pour créer un model de ce type
            // enregistrer en bdd
            const list = await Card.create({description,list_id, position,color});
            // retourner ce model au format json
            res.json(list);
        } catch(err) {
            res.status(500).json({
                statusCode: 500,
                message: "Server error",
                fullErrorMessage: err
            });
        }
    },
    update:  async (req, res, next) => {
        const cardId = Number(req.params.cardId);

        try {
            const list = await Card.findByPk(cardId);
            // 404 si la liste n'a pas été trouvée
            if (!list) {
                next();
                return;
            }
            // mise à jour de list
            // récupérer les données envoyées dans la requête post
            // on récupère chaque propriété depuis req.body, ou la valeur déjà présente dans le model si n'existe pas dans req.body
            const listData = {
                description: req.body.description || list.description,
                position: req.body.position || list.position,
                color : req.body.color || list.color
            }
            // mettre à jour le model
            await list.update(listData);
            // renvoyer le model à jour
            res.json(list);
        }
        catch(err) {
            res.status(500).json({
                statusCode: 500,
                message: "Server error",
                fullErrorMessage: err
            });
        }
    },
    delete: async (req, res, next) => {
        const cardId = Number(req.params.cardId);

        try {
            const list = await Card.findByPk(cardId);
            if (!list) {
                next();
                return;
            }
            // on supprime le model de la base
            await list.destroy();
            res.json(list);
        }
        catch(err) {
            res.status(500).json({
                statusCode: 500,
                message: "Server error",
                fullErrorMessage: err
            });
        }
    },
    addTag: async (req, res, next) => {
        // récupérer les données nécessaires
        const cardId = Number(req.params.cardId);
        const tagId = Number(req.body.tag_id);
        console.log(cardId + 'tag',tagId)
        // récupérer les models correspondant
        const card = await Card.findByPk(cardId, {include: 'tags'});
        const tag = await Tag.findByPk(tagId);
        
        // si un model n'existe pas, on renvoie en 404
        if (!card || !tag) {
            return next();
        }

        // faire l'association entre card et tag
        // on peut utiliser une méthode générée automatiquement par sequelize, ici par exemple la méthode addTag() sur le model Card.
        await card.addTag(tag);
        // on met à jour card avant de le renvoyer sinon le nouveau tag ne sera pas apparent (bien qu'enregistré en base)
        await card.reload();
        res.json(card);
    },

    deleteTag: async (req, res) => {
        try {
          const { cardId, tagId } = req.params;
    
          let card = await Card.findByPk(cardId);
          if (!card) {
            return res.status(404).json('Can not find card with id ' + cardId);
          }
    
          let tag = await Tag.findByPk(tagId);
          if (!tag) {
            return res.status(404).json('Can not find tag with id ' + tagId);
          }
    
          await card.removeTag(tag);
          card = await Card.findByPk(cardId, {
            include: ['tags']
          });
          res.json(card);
    
        } catch (error) {
          console.trace(error);
          res.status(500).json(error);
        }
      }

}

module.exports = cardController;