const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/documentTypes.controller'); 
const utilities = require('../utilities/utilities');

/**
 * @route POST /documentType
 * @group Document Types
 * @param {object} object.body - Document Types's Credentials - eg. {"name": "Faturas"} 
 * @returns {object} 201 - New Document Type created
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

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

/**
 * @route GET /documentTypes
 * @group Document Types
 * @returns {object} 200 - An array with all Document Types
 * @returns {Error} 404 - 0 Document Types found!
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
 * @route PUT /documentType/{id}
 * @group Document Types
 * @param {object} object.body - Document type's Credentials - eg. {"pending": 1}   //VER AQUI
 * @param {string} id.path - Document Type id
 * @returns {object} 200 - Document Type updated with success!
 * @returns {Error} 400 - Error while updating the Document Type!
 * @returns {Error} 400 - Only admin and users with access can update Document Types!
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 404 - Document Type not found
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */

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

/**
 * @route PATCH /documentType/{id}
 * @group Document Types
 * @param {object} object.body - Document Type's Credentials - eg. {"deleted": 1}
 * @param {string} id.path - Document Type
 * @returns {object} 200 - Document Type updated with success!
 * @returns {Error} 400 - Error while updating the Document Type!
 * @returns {Error} 400 - Only admin and users with access can update Document Types!
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 404 - Document Type not found
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */

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