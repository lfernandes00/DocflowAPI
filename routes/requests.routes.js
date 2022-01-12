const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/requests.controller'); 
const utilities = require('../utilities/utilities');

/**
 * @route POST /requests
 * @group Requests
 * @param {object} object.body - Request's Credentials - eg. {"userId": 1, "documentId": 1, type: 1} 
 * @returns {object} 201 - Request created with success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */
router.route('/').post([
    body('userId').notEmpty().escape(),
    body('documentId').notEmpty().escape(),
    body('type').notEmpty().escape()
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
       controller.create(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

/**
 * @route GET /requests
 * @group Request
 * @returns {object} 200 - An array with all requests
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
        utilities.validateToken(req,res),
        controller.listAll(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route PATCH /users/{documentId}/{userId}
 * @group Users
 * @param {object} object.body - User's Credentials - eg. {"pending": 1}
 * @param {string} documentId.path - document id
 * @returns {object} 200 - Request updated with success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 400 - Error while updating the request
 * @returns {Error} 400 - Only the user that created this request can remove it
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 404 - Request not found
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */
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