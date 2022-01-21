const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Model = require('../models/users.model');
const User = Model.User;
const Model2 = require('../models/documents.model');
const Document = Model2.Document;
const config = require('../config/auth.config');

const signup = async (req, res) => {
    try {
        let user = await User.findOne(
            { where: { email: req.body.email } }
        );

        if (user) {
            return res.status(400).json({ message: "Failed! Email is already in use!" });
        }

        user = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            name: req.body.name,
            typeId: 2,
            reviewCount: 0,
            aprovedCount: 0,
            workerNumber: req.body.workerNumber,
            uploadCount: 0,
            photo: "",
            deleted: 0
        });
        return res.status(201).json({ message: "User created with success!" });

    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    };
};

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });

        if (!user || user.deleted == 1)
            return res.status(404).json({ message: "User Not found." });
        // tests a string (password in body) against a hash (password in database)
        const passwordIsValid = bcrypt.compareSync(
            req.body.password, user.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null, message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ user }, config.secret, { expiresIn: 8600 });

        res.status(200).json({
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name,
            typeId: user.typeId,
            reviewCount: user.reviewCount,
            aprovedCouunt: user.aprovedCount,
            workerNumber: user.workerNumber,
            uploadCount: user.uploadCount,
            photo: user.photo,
            deleted: user.deleted,
            accessToken: token
        });
    }
    catch (err) { res.status(500).json({ message: err.message }); console.log(err); };
};

const listAll = (req, res) => {
    User.findAll({ where: { deleted: 0 } })
        .then((usersList) => {
            if (usersList === null) {
                res.status(404).json({ message: '0 users found!' });
            } else {
                res.status(200).json(usersList);
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const listOne = (req, res) => {
    User.findOne({
        where: { id: req.params.userId, deleted: 0 },
        include: [{
            model: Document, attributes: ['id', "extension"]
        },
        {
            model: Document, as: "Request", attributes: ["id", "extension"]
        }
    ]
    })
        .then((user) => {
            if (user === null) {
                res.status(404).json({ message: `User with id ${req.params.userId} not found!` });
            } else {
                res.status(200).json(user);
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const listOneRequests = (req, res) => {
    User.findOne({
        where: { id: req.params.userId, deleted: 0 },
        include:
        {
            model: Document, as: "Request"
        }
    })
        .then((user) => {
            if (user === null) {
                res.status(404).json({ message: `User with id ${req.params.userId} not found!` });
            } else {
                res.status(200).json(user);
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const remove = (req, res) => {
    if (req.loggedUserType == 1) {
        User.update(req.body, { where: { id: req.params.userId, deleted: 0 } })
            .then((num) => {
                if (num == 1) {
                    res.status(200).json({ message: `User with id ${req.params.userId} removed with success!` });
                } else {
                    res.status(404).json({ message: `User with id ${req.params.userId} not found!` });
                }
            })
            .catch((error) => {
                res.status(500).json(error.toString());
            })
    } else {
        res.status(400).json({ message: "Only admin can remove users!" })
    }
}

const update = (req, res) => {
    var newPassword = "";
    if (req.body.password != null) {
        newPassword = bcrypt.hashSync(req.body.password, 8);
        req.body.password = newPassword;
    } 

    if (req.loggedUserId == req.params.userId) {
        User.update(req.body, { where: { id: req.params.userId, deleted: 0 } })
            .then((num) => {
                if (num == 1) {
                    res.status(200).json({ message: `User with id ${req.params.userId} updated with success!` });
                } else {
                    res.status(404).json({ message: `User with id ${req.params.userId} not found!` });
                }
            })
            .catch((error) => {
                res.status(500).json(error.toString())
            })
    } else {
        res.status(400).json({ message: "Cannot update other users!" })
    }
}

exports.signup = signup;
exports.signin = signin;
exports.listAll = listAll;
exports.listOne = listOne;
exports.listOneRequests = listOneRequests;
exports.remove = remove;
exports.update = update;