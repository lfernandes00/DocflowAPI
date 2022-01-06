var jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const userModel = require('../models/users.model');
const User = userModel.User;

const validateToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(403).send({message: "No token provided!"});
    }

    jwt.verify(token.replace('Bearer ', ''), config.secret, (error, decoded) => {
        if (error) {
            return res.status(401).send({message: "Invalid Token!"})
        }

        User.findOne({where: {id: decoded.user.id}})
        .then((user) => {
            if (user === null) {
                res.status(404).json({message: `User not found!`})
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString())
        })

        req.loggedUserId = decoded.user.id
        req.loggedUserType = decoded.user.typeId
        console.log(decoded.user.id, decoded.user.typeId)
    })
}

exports.validateToken = validateToken;