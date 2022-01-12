const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/documentTypes.controller'); 
const utilities = require('../utilities/utilities');

router.route('/').post([
    body('name').notEmpty().escape(),
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
       controller.create(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

router.route('/').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listAll(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/:documentTypeId').put([
    body('name').notEmpty().escape(),
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
        utilities.validateToken(req,res),
       controller.update(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

router.route('/:documentTypeId').patch([
    body('deleted').isNumeric().notEmpty().escape(),
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
        utilities.validateToken(req,res),
       controller.remove(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

module.exports = router;