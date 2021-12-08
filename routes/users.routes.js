const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/users.controller'); 

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next()
})

router.route('/signup').post([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().escape(),
    body('name').notEmpty().escape(),
    body('workerNumber').notEmpty().escape(),
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
       controller.signup(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

router.route('/signin').post([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().escape(),
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
       controller.signin(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

router.route('/').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listAll(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/:userId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listOne(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/:userId').delete(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.remove(req, res);
    } else {
        res.status(400).send(erros);
    }
})

router.route('/:userId').patch(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.update(req, res);
    } else {
        res.status(400).send(erros);
    }
})

module.exports = router;