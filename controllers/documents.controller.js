const Model = require('../models/documents.model');
const Document = Model.Document;
const Model2 = require('../models/users.model');
const User = Model2.User;
const Model3 = require('../models/documentTypes.model');
const DocumentType = Model3.DocumentType;
const Model4 = require('../models/folders.model');
const Folder = Model4.Folder;
const Model5 = require('../models/clients.model');
const Client = Model5.Client;

const create = (req, res) => {
    const newDocument = {
        name: req.body.name,
        userId: req.loggedUserId,
        dataVencimento: req.body.dataVencimento,
        typeId: req.body.typeId,
        version: req.body.version,
        pending: 0,
        value: req.body.value,
        description: req.body.description,
        clientId: req.body.clientId,
        extension: "https://img.r7.com/images/documentos-vazados-eua-ovnis-12022019171625471",
        folderId: req.body.folderId,
        deleted: 0
    }

    if (req.loggedUserId != null) {
        Document.create(newDocument)
        .then((data) => {
            res.status(201).json({ message: `New document created`, location: data.id })
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
    } else {
        res.status(400).json({message: "User not found!"});
    }

    
}

const listById = (req, res) => {
    Document.findOne(
        {
            where: {
                id: req.params.documentId,
                deleted: 0
            },
            include: [
                {
                    model: User, attributes: ['id', 'name']
                },
                {
                    model: DocumentType, attributes: ['name']
                },
                {
                    model: Folder, attributes: ['name']
                },
                {
                    model: Client, attributes: ['name']
                },
                {
                    model: User, as: "Request", attributes: ["id"]
                }
            ]
        })
        .then((document) => {
            if (document === null) {
                res.status(404).json({ message: `Document with id ${req.params.documentId} not found!` });
            } else {
                res.status(200).json(document);
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        });
};

const listByType = (req, res) => {
    Document.findAll({ where: { typeId: req.params.typeId, deleted: 0 } })
        .then((documentsList) => {
            if (documentsList === null) {
                res.status(404).json({ message: '0 documents found!' });
            } else {
                res.status(200).json(documentsList);
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const listByFolder = (req, res) => {
    Document.findAll({ where: { folderId: req.params.folderId, deleted: 0 } })
        .then((documentsList) => {
            if (documentsList === null) {
                res.status(404).json({ message: '0 documents found!' });
            } else {
                res.status(200).json(documentsList);
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const listByUser = (req, res) => {
    Document.findAll({ where: { userId: req.params.userId, deleted: 0 } })
        .then((documentsList) => {
            if (documentsList === null) {
                res.status(404).json({ message: '0 documents found!' });
            } else {
                res.status(200).json(documentsList);
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const listByClient = (req, res) => {
    Document.findAll({ where: { clientId: req.params.clientId, deleted: 0 } })
        .then((documentsList) => {
            if (documentsList === null) {
                res.status(404).json({ message: '0 documents found!' });
            } else {
                res.status(200).json(documentsList);
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const update = (req, res) => {
    Document.findOne({ where: { id: req.params.documentId, deleted: 0 } })
        .then((document) => {
            if (document === null) {
                res.status(404).json({ message: `Document with id ${req.params.documentId} not found!` });
            } else {
                if (req.loggedUserId == document.userId) {
                    Document.update(req.body, { where: { id: req.params.documentId, deleted: 0 } })
                        .then((num) => {
                            if (num == 1) {
                                res.status(200).json({ message: `Document with id ${req.params.documentId} updated with success!` });
                            } else {
                                res.status(404).json({ message: 'Error while updating document!' })
                            }
                        })
                        .catch((error) => {
                            res.status(500).json(error.toString());
                        })
                } else {
                    res.status(400).json({ message: 'Cannot update documents created by other users!' });
                }
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const updateFromRequest = (req, res) => {
    Document.update(req.body, { where: { id: req.params.documentId, deleted: 0 } })
        .then((num) => {
            if (num == 1) {
                res.status(200).json({ message: `Document with id ${req.params.documentId} updated with success!` });
            } else {
                res.status(404).json({ message: 'Error while updating document!' })
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const remove = (req, res) => {
    Document.findOne({ where: { id: req.params.documentId, deleted: 0 } })
        .then((document) => {
            if (document === null) {
                res.status(404).json({ message: `Document with id ${req.params.documentId} not found!` });
            } else {
                if (req.loggedUserId == document.userId || req.loggedUserType == 1) {
                    Document.update(req.body, { where: { id: req.params.documentId, deleted: 0 } })
                        .then((num) => {
                            if (num == 1) {
                                res.status(200).json({ message: `Document with id ${req.params.documentId} removed with success!` });
                            } else {
                                res.status(400).json({ message: 'Error while removing document!' });
                            }
                        })
                        .catch((error) => {
                            res.status(500).json(error.toString())
                        })
                } else {
                    res.status(400).json({ message: 'Only admin or the user who created this document can remove it!' });
                }
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

exports.create = create;
exports.listById = listById;
exports.listByType = listByType;
exports.listByFolder = listByFolder;
exports.listByUser = listByUser;
exports.listByClient = listByClient;
exports.update = update;
exports.updateFromRequest = updateFromRequest;
exports.remove = remove;