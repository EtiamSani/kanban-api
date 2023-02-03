const List  = require('../models/List')

const listController = {
    allLists: async (req, res) => {
        try {
        const getAllLists = await List.findAll();

        res.json(getAllLists)
        } catch (error) {
            // On log l'erreur afin d'avoir une trace et de corriger cette erreur.
            console.error(error)
            // On renvoie vers la page 500 afin d'informer l'utilisateur qu'il y a eu un probleme technique sur l'application web.
        }
    },
    oneList: async (req, res) => {
        id = req.params.id
        try {
            const getOneLists = await List.findOne({
                where : {
                    id : id}});
    
            res.json(getOneLists)
            } catch (error) {
                // On log l'erreur afin d'avoir une trace et de corriger cette erreur.
                console.error(error)
                // On renvoie vers la page 500 afin d'informer l'utilisateur qu'il y a eu un probleme technique sur l'application web.
            }
    },
    creatAList: async (req, res) => {
        try {
            const creatOneList = await List.create({name : "En Attente"},{position : "4"});
    
            res.json(creatOneList)
            } catch (error) {
                // On log l'erreur afin d'avoir une trace et de corriger cette erreur.
                console.error(error)
                // On renvoie vers la page 500 afin d'informer l'utilisateur qu'il y a eu un probleme technique sur l'application web.
            }
        
    },
    modifyAList: async (req, res) => {
        try {
            id = req.params.id
            let findAList = await List.findByPk(id)
            const modifyOneList = await List.update({name : "Loisir"},{where : {id:id}});
    
            res.json(modifyOneList)
            } catch (error) {
                // On log l'erreur afin d'avoir une trace et de corriger cette erreur.
                console.error(error)
                // On renvoie vers la page 500 afin d'informer l'utilisateur qu'il y a eu un probleme technique sur l'application web.
            }
        
    },
    deleteAlist: async (req, res) => {
        try {
            id = req.params.id
            
            const deletAList = await List.destroy({where : {id:id}});
    
            res.json(deletAList)
            } catch (error) {
                // On log l'erreur afin d'avoir une trace et de corriger cette erreur.
                console.error(error)
                // On renvoie vers la page 500 afin d'informer l'utilisateur qu'il y a eu un probleme technique sur l'application web.
            }
    },
};

module.exports = listController;