const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/requests.controller'); 
const utilities = require('../utilities/utilities');

router.route('/').post([
    body('userId').notEmpty().escape(),
    body('documentId').notEmpty().escape(),
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
        utilities.validateToken(req,res),
        controller.listAll(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/:documentId/:userId').patch([
    body('pending').notEmpty().escape()
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
        utilities.validateToken(req,res),
       controller.update(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

module.exports = router;