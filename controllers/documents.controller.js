const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Model = require('../models/documents.model');
const Document = Model.Document;
const Model2 = require('../models/users.model');
const User = Model2.User;

const create = (req, res) => {
    const newDocument = {
        name: req.body.name,
        userId: req.body.userId,
        dataVencimento: req.body.dataVencimento,
        typeId: req.body.typeId,
        version: req.body.version,
        pending: 0,
        value: req.body.value,
        description: req.body.description,
        clientId: req.body.clientId,
        extension: req.body.extension,
        folderId: req.body.folderId
    }

    Document.create(newDocument)
    .then((data) => {
        res.status(201).json({message: `New activity created`, location: "/documents" + data.id})
    })
    .catch((error) => {
        res.status(500).json(error);
    })
}

const listById = (req, res) => {
    Document.findOne(
        {
            where: {
                id: req.params.documentId
            },
            include: {
                model: User, 
                attributes: ['id']
            } 
        })
        .then((document) => {
            if (document === null) {
                res.status(404).json({message: `Document with id ${req.params.documentId} not found!`});
            } else {
                res.status(200).json(document);
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

const listByType = (req, res) => {
    Document.findAll({where: {typeId: req.params.typeId}})
    .then((documentsList) => {
        if (documentsList === null) {
            res.status(404).json({message: '0 documents found!'});
        } else {
            res.status(200).json(documentsList);
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    })
}

const listByFolder = (req, res) => {
    Document.findAll({where: {folderId: req.params.folderId}})
    .then((documentsList) => {
        if (documentsList === null) {
            res.status(404).json({message: '0 documents found!'});
        } else {
            res.status(200).json(documentsList);
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    })
}

const listByUser = (req, res) => {
    Document.findAll({where: {userId: req.params.userId}})
    .then((documentsList) => {
        if (documentsList === null) {
            res.status(404).json({message: '0 documents found!'});
        } else {
            res.status(200).json(documentsList);
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    })
}

const listByClient = (req, res) => {
    Document.findAll({where: {clientId: req.params.clientId}})
    .then((documentsList) => {
        if (documentsList === null) {
            res.status(404).json({message: '0 documents found!'});
        } else {
            res.status(200).json(documentsList);
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    })
}

const update = (req, res) => {
    Document.update(req.body, {where: {id: req.params.documentId}})
    .then((num) => {
        if (num == 1) {
            res.status(200).json({message: `Document with id ${req.params.documentId} updated with success!`});
        } else {
            res.status(404).json({message: `Document with id ${req.params.documentId} not found!`});
        }
    })
    .catch((error) => {
        res.status(500).json(error)
    })
}

const remove = (req, res) => {
    Document.destroy({where: {id: req.params.documentId}})
    .then((num) => {
        if (num == 1) {
            res.status(200).json({message: `Document with id ${req.params.documentId} removed with success!`});
        } else {
            res.status(404).json({message: `Document with id ${req.params.documentId} not found!`});
        }
    })
    .catch((error) => {
        res.status(500).json(error)
    })
}

exports.create = create;
exports.listById = listById;
exports.listByType = listByType;
exports.listByFolder = listByFolder;
exports.listByUser = listByUser;
exports.listByClient = listByClient;
exports.update = update;
exports.remove = remove;