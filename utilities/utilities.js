var jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const generateToken = (client_info, callback) => {
    let token = jwt.sign({
        data: client_info,
    }, config.secret, {expiresIn: '24h'});
    return callback(token); 
}

const validateToken = (token, callback) => {
    if(!token) {
        return callback(false); 
    }
    jwt.verify(token.replace('Bearer ', ''), config.secret, function(error, decoded) {
        if(error) {
            return callback(false);
        } else {
            return callback(true)
        }
    })
}

exports.generateToken = generateToken
exports.validateToken = validateToken