const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/documents.controller');
const utilities = require('../utilities/utilities');

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next()
})

router.route('/').post([
    body('name').notEmpty().escape(),
    body('userId').notEmpty().escape(),
    body('dataVencimento').notEmpty().escape(),
    body('typeId').notEmpty().escape(),
    body('version').notEmpty().escape(),
    body('description').notEmpty().escape(),
    body('clientId').notEmpty().escape(),
    body('extension').notEmpty().escape(),
    body('folderId').notEmpty().escape()
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
       controller.create(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

router.route('/:documentId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listById(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/type/:typeId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listByType(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/folder/:folderId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listByFolder(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/user/:userId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listByUser(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/client/:clientId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listByClient(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/:documentId').put(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        utilities.validateToken(req,res),
        controller.update(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/:documentId').patch(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        utilities.validateToken(req,res),
        controller.remove(req, res);
    } else {
        res.status(400).send(erros);
    }
})

module.exports = router;