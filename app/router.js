const express = require('express');
const router = express.Router();
const listController = require('./controllers/listController')
// controllers




router.get('/lists', listController.allLists);
router.get('/lists/:id', listController.oneList);
router.post('/lists', listController.creatAList);
router.put('/lists/:id', listController.modifyAList);
router.delete('/lists/:id', listController.deleteAlist);



module.exports = router;