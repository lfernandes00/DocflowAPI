const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/folderAccess.controller'); 
const utilities = require('../utilities/utilities');

/**
 * @route POST /folderAccess
 * @group Folder Access
 * @param {object} object.body - Folder Access's Credentials - eg. {"userId": 1,"folderId": 1 } 
 * @returns {object} 201 - New FolderAccess created
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/').post([
    body('userId').isNumeric().notEmpty().escape(),
    body('folderId').isNumeric().notEmpty().escape(),
    body('access').isNumeric().notEmpty().escape(),
    body('color').isNumeric().notEmpty().escape()
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
       controller.create(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

/**
 * @route PUT /folderAccess/{id}/{userId}
 * @group Folder Access
 * @param {object} object.body - Folder Access's Credentials - eg. {"pending": 1}   //VER AQUI
 * @param {string} id.path - Folder Access id
 * @returns {object} 200 - FolderAccess updated with success!
 * @returns {Error} 400 - Error while updating the FolderAccess!
 * @returns {Error} 400 - Only admin and users with access can update folderAccess!
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 404 - Folder Access not found!
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */

router.route('/:folderId/:userId').put([
    body('access').isNumeric().notEmpty().escape(),
    body('color').isNumeric().notEmpty().escape()
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