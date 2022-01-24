const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/clients.controller'); 
const utilities = require('../utilities/utilities');

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next()
})

/**
 * @route GET /clients
 * @group Clients
 * @returns {object} 200 - An array with all clients
 * @returns {Error} 404 - 0 clients found
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listAll(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route GET /clients/{id}
 * @group Clients
 * @returns {object} 200 - Client
 * @returns {Error} 404 - Client not found!
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/:clientId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listOne(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route POST /clients
 * @group Clients
 * @param {object} object.body - Client's Credentials - eg. {"name": "Faturas"} 
 * @returns {object} 201 - New Client created with success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/').post([
    body('NIF').isNumeric().notEmpty().escape(),
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

/**
 * @route PUT /clients/{id}
 * @group Clients
 * @param {object} object.body - Client's Credentials - eg. {"pending": 1}   //VER AQUI
 * @param {string} id.path - Client id
 * @returns {object} 200 - Client updated with success
 * @returns {Error} 400 - Error while updating the Client!
 * @returns {Error} 400 - Only admin can update clients!
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */

router.route('/:clientId').put(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        utilities.validateToken(req,res),
        controller.update(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route PATCH /clients/{id}
 * @group Clients
 * @param {object} object.body - Client's Credentials - eg. {"deleted": 1}
 * @param {string} id.path - Client id.
 * @returns {object} 200 - Client updated with success
 * @returns {Error} 400 - Error while updating the Client!
 * @returns {Error} 400 - Only admin can update clients!
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */

router.route('/:clientId').patch([
    body('deleted').isNumeric().notEmpty().escape()
],function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        utilities.validateToken(req,res),
        controller.remove(req, res);
    } else {
        res.status(400).send(erros);
    }
})

module.exports = router;