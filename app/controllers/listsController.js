const List = require('../models/List');
const Card = require('../models/Card');

const listController = {
    // contrôleur pour la route /lists/
    getAll: async (req, res) => {
        try {
            const lists = await List.findAll({
              include: {
                association: 'cards',               // On inclue l'association cards (une list avec ses cards)
                include: 'tags'                     // Pour chaque card, on inclue l'association tags (une card avec ses tags)
              },
              order: [                              // On trie
                ['position', 'ASC'],                // Les listes par position ascendante (du plus petit au plus grand)
                ['cards', 'position', 'ASC']        // Les cards par position ascendante 
              ]
            });
            res.status(200).json(lists);            // On renvoie la réponse avec un code 200 : OK
          } catch (error) {                         // En cas d'erreur
            console.trace(error);                   // On affiche l'erreur en console
            res.status(500).json(error.toString()); // On renvoie une réponse avec code 500 : internal server error, ainsi que le message d'erreur
          }
       
    }, 
    getOne: async (req, res) => {
        const listId = Number(req.params.listId);

        try {
            // on peut ajouter en deuxième argument des options pour le findByPK, ici par exemple les modèles liés à inclure
            const list = await List.findByPk(listId, {
                include: Card
            });
            // validation => si rien dans list => 404
            if (!list) {
                
                return;
            }
            // réponse au format json
            res.json(list);
        } catch(err) {
            res.status(500).json({
                statusCode: 500,
                message: "Server error",
                fullErrorMessage: err
            });
        }
    }, 
    create: async (req, res) => {
        // il faut récupérer le name passé dans le body de la requête
        // pour éviter l'erreur Cannot read properties of undefined (reading 'name'), il faut penser à déclarer l'usage du middleware express.json() dans index.js
        const name = req.body.name;
        // important : étape de validation, on renvoie une erreur 400 si on n'est pas content de ce que l'utilisateur nous a envoyé
        // typeof renvoie sous forme de string le type de l'élément analysé
        // ici name doit être une string et faire plus de 1 caractère
        if (typeof name != 'string' || name.length < 2) {
            res.status(400).json({
                statusCode: 400,
                message: "Bad request"
            });
        }

        try {
            // générer un model avec ce name
            // on passe à create() un objet qui contient les propriétés nécessaires pour créer un model de ce type
            // enregistrer en bdd
            const list = await List.create({ name });
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
        const listId = Number(req.params.listId);

        try {
            const list = await List.findByPk(listId);
            // 404 si la liste n'a pas été trouvée
            if (!list) {
                next();
                return;
            }
            // mise à jour de list
            // récupérer les données envoyées dans la requête post
            // on récupère chaque propriété depuis req.body, ou la valeur déjà présente dans le model si n'existe pas dans req.body
            const listData = {
                name: req.body.name || list.name,
                position: req.body.position || list.position,
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
        const listId = Number(req.params.listId);

        try {
            const list = await List.findByPk(listId);
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
    }
}

module.exports = listController;