const Card = require('../models/Card');
const Tag = require('../models/Tag');
const List = require('../models/List');




const tagController = {
    getAll: async (req, res) => {

        
        // récupérer les données => models
        const allLists = await Tag.findAll({
            include: Card
        });
        // renvoyer les données au format JSON
        res.json(allLists);
    }, 
    getOne: async (req, res, next) => {
        const cardId = Number(req.params.cardId);

        try {
            // on peut ajouter en deuxième argument des options pour le findByPK, ici par exemple les modèles liés à inclure
            const list = await Card.findByPk(cardId, {
                include: Tag
            });
            // validation => si rien dans list => 404
            if (!list) {
                next();
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
    create: async (req, res, next) => {
        // il faut récupérer le name passé dans le body de la requête
        // pour éviter l'erreur Cannot read properties of undefined (reading 'name'), il faut penser à déclarer l'usage du middleware express.json() dans index.js
        const name = req.body.name;
        const color = req.body.color;
        
        console.log(name)
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
            const list = await Tag.create({name,color});
            // retourner ce model au format json
            console.log(list)
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
        const cardId = Number(req.params.tagId);
        console.log(cardId)

        try {
            const list = await Tag.findByPk(cardId);
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
        const cardId = Number(req.params.tagId);

        try {
            const list = await Tag.findByPk(cardId);
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

    creatTagInCard : async (req, res, next) => {
        
        try {
            const cardId = Number(req.params.cardId);
            console.log(cardId)
            const card = await Card.findByPk(cardId);
        
            
            const {tagId} = req.body
            console.log(tagId)
            
            const tag = await Tag.findByPk(tagId)
            const result = await card.addTag(tag);
            
            res.json(result);
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

module.exports = tagController;