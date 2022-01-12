const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/folders.controller'); 
const utilities = require('../utilities/utilities');

/**
 * @route POST /folders
 * @group Folders
 * @param {object} object.body - Folder's Credentials - eg. {"name": "Faturas"} 
 * @returns {object} 201 - Folder created with success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
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
 * @route GET /folders
 * @group Folders
 * @returns {object} 200 - An array with all folders
 * @returns {Error} 404 - 0 requests found
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */
router.route('/').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listAll(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/:folderId').put([
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

router.route('/:folderId').patch([
    body('deleted').notEmpty().escape(),
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