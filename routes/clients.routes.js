const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/clients.controller'); 

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next()
})

router.route('/').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listAll(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/:clientId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listOne(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/').post([
    body('NIF').notEmpty().escape(),
    body('name').notEmpty().escape(),
    body('adress').notEmpty().escape()
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
       controller.create(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

router.route('/:clientId').delete(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.remove(req, res);
    } else {
        res.status(400).send(erros);
    }
})

module.exports = router;