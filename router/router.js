const express = require('express');
const router = express.Router();
const categoria = require('../controller/categoria');
const financa = require('../controller/financa');

router.post('/create/categoria', categoria.create);
router.get('/list/categorias/:page', categoria.findAll);
router.put('/update/categoria/:id', categoria.update);
router.delete('/delete/categoria/:id', categoria.delete);

router.post('/create/financa', financa.create);
router.get('/list/financas/:page', financa.findAll);
router.get('/search/financa/categoria_id/:id', financa.findByIdCategoria);
router.get('/list/financas/dataInicial/:dataInicial/dataFinal/:dataFinal/page/:page', financa.findAllDate);
router.put('/update/financa/:id', financa.update);
router.delete('/delete/financa/:id', financa.delete);

module.exports = router;