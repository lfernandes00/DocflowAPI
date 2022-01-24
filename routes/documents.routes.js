const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/documents.controller');
const utilities = require('../utilities/utilities');

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next()
})

/**
 * @route POST /Documents
 * @group Documents
 * @param {object} object.body - Documents's Credentials - eg. {"name": "Luís","userId":2 ,"dataVencimento": "24/12/2021","typeId": 1,"version": 1,"value": 1,"description": "Fatura da Continental","clientId": 3,"folderId": 1} 
 * @returns {object} 201 - New document created with success
 * @returns {Error} 400 - User not found!
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */

router.route('/').post([
    body('name').notEmpty().escape(),
    body('dataVencimento').notEmpty().escape(),
    body('typeId').isNumeric().notEmpty().escape(),
    body('version').isNumeric().notEmpty().escape(),
    body('description').notEmpty().escape(),
    body('clientId').isNumeric().notEmpty().escape(),
    body('extension').notEmpty().escape(),
    body('folderId').isNumeric().notEmpty().escape()
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
        utilities.validateToken(req,res),
       controller.create(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

/**
 * @route GET /documents/{id}
 * @group Documents
 * @returns {object} 200 - Document
 * @returns {Error} 404 - Document not found!
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/:documentId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listById(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route GET /type/{id}
 * @group Type
 * @returns {object} 200 - Document list by type
 * @returns {Error} 404 - Documents not found!
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/type/:typeId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listByType(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route GET /folder/{id}
 * @group Folder
 * @returns {object} 200 - Document list by folder
 * @returns {Error} 404 - 0 Documents found!
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/folder/:folderId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listByFolder(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route GET /user/{id}
 * @group User
 * @returns {object} 200 - Document list by user
 * @returns {Error} 404 - Documents not found!
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/user/:userId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listByUser(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route GET /client/{id}
 * @group Client
 * @returns {object} 200 - Document list by client
 * @returns {Error} 404 - Documents not found!
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/client/:clientId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listByClient(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route PUT /Documents/{id}
 * @group Documents
 * @param {object} object.body - Document's Credentials - eg. {"pending": 1}   
 * @param {string} id.path - Document id
 * @returns {object} 200 - Document updated with success!
 * @returns {Error} 400 - Cannot update documents created by other users!
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 404 - Document not found!
 * @returns {Error} 404 - Error while updating document!
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */

router.route('/:documentId').put(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        utilities.validateToken(req,res),
        controller.update(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route PATCH /Documents/{id}/requests
 * @group Documents
 * @param {object} object.body - Document's Credentials - eg. {"deleted": 1}
 * @param {string} id.path - Document id.
 * @returns {object} 200 - Document updated with success
 * @returns {Error} 404 - Error while updating document!
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/:documentId/requests').patch(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.updateFromRequest(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route PATCH /Documents/{id}/requests
 * @group Documents
 * @param {object} object.body - Document's Credentials - eg. {"deleted": 1}
 * @param {string} id.path - Document id.
 * @returns {object} 200 - Document removed with success!
 * @returns {object} 400 - Error while removing document!
 * @returns {object} 400 - Only admin or the user who created this document can remove it!
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 404 - Error while updating document!
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */

router.route('/:documentId').patch([
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