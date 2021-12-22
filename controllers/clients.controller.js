const Model = require('../models/clients.model');
const Client = Model.Client;

const listAll = (req, res) => {
    Client.findAll({where: {deleted: 0}})
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
    Client.findOne({where: {id: req.params.clientId, deleted: 0}})
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

const update = (req, res) => {
    if (req.loggedUserType == 1) {
        Client.update(req.body,{where: {id: req.params.clientId, deleted: 0}})
        .then((num) => {
            if (num == 1) {
                res.status(200).json({message: `Client with id ${req.params.clientId} updated with success!`});
            } else {
                res.status(400).json({message: 'Error while updating the Client!'});
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } else {
        res.status(400).json({message: 'Only admin can update clients!'});
    }
}

const remove = (req, res) => {
    if (req.loggedUserType == 1) {
        Client.update(req.body,{where: {id: req.params.clientId, deleted: 0}})
        .then((num) => {
            if (num == 1) {
                res.status(200).json({message: `Client with id ${req.params.clientId} removed with success!`});
            } else {
                res.status(400).json({message: 'Error while removing the Client!'});
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } else {
        res.status(400).json({message: 'Only admin can remove clients!'});
    }
}

exports.listAll = listAll;
exports.listOne = listOne;
exports.create = create;
exports.update = update;
exports.remove = remove;