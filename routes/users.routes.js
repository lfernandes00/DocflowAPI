const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/users.controller'); 
const utilities = require('../utilities/utilities');

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next()
})

/**
 * @route POST /users/signup
 * @group Users
 * @param {object} object.body - User's Credentials - eg. {"email": "teste@gmail.com", "password": "1234", "name": "Luís": "workerNumber": 123} 
 * @returns {object} 201 - User created with success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 400 - Email already in use
 * @returns {Error} 500 - Internal Server Error
 */
router.route('/signup').post([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().escape(),
    body('name').notEmpty().escape(),
    body('workerNumber').isNumeric().escape(),
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
       controller.signup(req, res); 
    } else {
        res.status(400).send(errors); 
    }
})

/**
 * @route POST /users/signin
 * @group Users
 * @param {object} object.body - User's Credentials - eg. {"email": "teste@gmail.com", "password": "1234"} 
 * @returns {object} 200 - Login success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Password
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal Server Error
 */
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

/**
 * @route GET /users
 * @group Users
 * @returns {object} 200 - An array with all users
 * @returns {Error} 404 - 0 users found
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

/**
 * @route GET /users/{id}
 * @group Users
 * @param {string} id.path - user id.
 * @returns {object} 200 - User Object
 * @returns {Error} 404 - Cant find client with this id
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */
router.route('/:userId').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.listOne(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route PATCH /users/{id}
 * @group Users
 * @param {object} object.body - User's Credentials - eg. {"deleted": 1}
 * @param {string} id.path - Client id.
 * @returns {object} 200 - User removed with success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 400 - Only admin can remove users
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */
router.route('/:userId').patch([
    body('deleted').notEmpty().escape(),
],function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        utilities.validateToken(req,res),
        controller.remove(req, res);
    } else {
        res.status(400).send(erros);
    }
})

/**
 * @route PUT /users/{id}
 * @group Users
 * @param {object} object.body - User's Credentials - eg. {"name": "Luis F"}
 * @param {string} id.path - Client id.
 * @returns {object} 200 - User updated with success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 400 - Cannot update other users
 * @returns {Error} 401 - Invalid Token
 * @returns {Error} 403 - No token provided
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal Server Error
 * @security Bearer
 */
router.route('/:userId').put(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        utilities.validateToken(req,res),
        controller.update(req, res);
    } else {
        res.status(400).send(erros);
    }
})

module.exports = router;