const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/notifications.controller'); 
const utilities = require('../utilities/utilities');

module.exports = router;