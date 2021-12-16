const Model = require('../models/clients.model');
const Client = Model.Client;

const listAll = (req, res) => {
    Client.findAll()
    .then((clientsList) => {
        if (clientsList.length == 0) {
            res.status(404).json({message: '0 clients found!'});
        } else {
            res.status(200).json(clientsList);
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    })
}

const listOne = (req, res) => {
    Client.findOne({where: {id: req.params.clientId}})
    .then((client) => {
        if (client === null) {
            res.status(404).json({message: `Client with id ${req.params.clientId} not found!`});
        } else {
            res.status(200).json(client)
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    })
}

const create = (req, res) => {
    const newClient = {
        NIF: req.body.NIF,
        name: req.body.name,
        adress: req.body.adress,
        deleted: 0
    }

    Client.create(newClient)
        .then((data) => {
            res.status(201).json({ message: `New Client created`, location: "/clients" + data.id })
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}

// update

const remove = (req, res) => {
    Client.destroy({ where: { id: req.params.clientId } })
        .then((num) => {
            if (num == 1) {
                res.status(200).json({ message: `Client with id ${req.params.clientId} removed with success!` });
            } else {
                res.status(404).json({ message: 'Error removing the document!' });
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}

exports.listAll = listAll;
exports.listOne = listOne;
exports.create = create;
exports.remove = remove;
