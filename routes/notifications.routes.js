const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/notifications.controller'); 
const utilities = require('../utilities/utilities');

/**
 * @route POST /notifications
 * @group Notifications
 * @param {object} object.body - Notifications's Credentials - eg. {"name": "Faturas"} 
 * @returns {object} 201 - New Notification Created
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/').post([
    body('userId').notEmpty().escape(),
    body('desc').notEmpty().escape()
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
       controller.create(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

/**
 * @route GET /notifications/userId
 * @group Notifications
 * @returns {object} 200 - An array with all notifications by user
 * @returns {Error} 404 - 0 notifications found!
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 */

router.route('/:userId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listByUser(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route PATCH /notifications/{id}
 * @group Notifications
 * @param {object} object.body - Notifications's Credentials - eg. {"deleted": 1}
 * @param {string} id.path - Notification id.
 * @returns {object} 200 - Notification removed with success!
 * @returns {Error} 400 - Error while removing notification!
 * @returns {Error} 400 - Only admin or the user who created this notification can remove it!
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 404 - Notification not found
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */

router.route('/:notificationId').patch([
    body('deleted').isNumeric().notEmpty().escape()
],function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        utilities.validateToken(req,res),
        controller.remove(req, res);
    } else {
        res.status(400).send(errors);
    }
})

module.exports = router;