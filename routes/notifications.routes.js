const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/notifications.controller'); 
const utilities = require('../utilities/utilities');

router.route('/').post([
    body('userId').notEmpty().escape(),
    body('desc').notEmpty().escape(),
    body('date').notEmpty().escape(),
    body('deleted').isNumeric().notEmpty().escape(),
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
       controller.create(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

router.route('/:userId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listByUser(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/:notificationId').patch([
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