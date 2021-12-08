const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Model = require('../models/clients.model');
const Client = Model.Client;

const create = (req, res) => {
    const newClient = {
        NIF: req.body.NIF,
        name: req.body.name,
        adress: req.body.adress
    }

    Client.create(newClient)
    .then((data) => {
        res.status(201).json({message: `New Client created`, location: "/clients" + data.id})
    })
    .catch((error) => {
        res.status(500).json(error);
    })
}

exports.create = create;