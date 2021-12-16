const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Model = require('../models/users.model');
const User = Model.User;
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
            photo: ""
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

        if (!user)
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
            accessToken: token
        });
    }
    catch (err) { res.status(500).json({ message: err.message }); console.log(err); };
};

const listAll = (req, res) => {
    User.findAll()
        .then((usersList) => {
            if (usersList === null) {
                res.status(404).json({ message: '0 users found!' });
            } else {
                res.status(200).json(usersList);
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}

const listOne = (req, res) => {
    User.findOne({ where: { id: req.params.userId } })
        .then((user) => {
            if (user === null) {
                res.status(404).json({ message: `User with id ${req.params.userId} not found!` });
            } else {
                res.status(200).json(user);
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}

const remove = (req, res) => {
    if (req.loggedUserType == 1) {
        User.destroy({ where: { id: req.params.userId } })
            .then((num) => {
                if (num == 1) {
                    res.status(200).json({ message: `User with id ${req.params.userId} removed with success!` });
                } else {
                    res.status(404).json({ message: `User with id ${req.params.userId} not found!` });
                }
            })
            .catch(error => {
                res.status(500).json(error);
            })
    } else {
        res.status(400).json({ message: "Only admin can remove users!" })
    }
}

const update = (req, res) => {
    const newPassword = "";
    if (req.body.password != null) {
        newPassword = bcrypt.hashSync(req.body.password, 8);
    }

    if (req.loggedUserId == req.params.userId) {
        User.update(req.body, { where: { id: req.params.userId } })
            .then((num) => {
                if (num == 1) {
                    res.status(200).json({ message: `User with id ${req.params.userId} updated with success!` });
                } else {
                    res.status(404).json({ message: `User with id ${req.params.userId} not found!` });
                }
            })
            .catch((error) => {
                res.status(500).json(error)
            })
    } else {
        res.status(400).json({ message: "Cannot update other users!" })
    }
}

exports.signup = signup;
exports.signin = signin;
exports.listAll = listAll;
exports.listOne = listOne;
exports.remove = remove;
exports.update = update;