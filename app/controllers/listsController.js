const List = require('../models/List');

const listController = {
    // contrôleur pour la route /lists/
    getAll: async (req, res) => {
        // récupérer les données => models
        const allLists = await List.findAll();
        console.log(allLists);
        // renvoyer les données au format JSON
        res.json(allLists);
    }
}

module.exports = listController;