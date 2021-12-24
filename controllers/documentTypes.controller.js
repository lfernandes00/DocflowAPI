const Model = require('../models/documentTypes.model');
const DocumentType = Model.DocumentType;
const Model2 = require('../models/documents.model');
const Document = Model2.Document;

const create = (req, res) => {
    const newType = {
        name: req.body.name,
        deleted: 0
    }

    DocumentType.create(newType)
        .then((data) => {
            res.status(201).json({ message: `New Document Type created`, location: "/documentTypes" + data.id })
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const listAll = (req, res) => {
    DocumentType.findAll({where: {deleted: 0}, 
    include: {
        model: Document, attributes: ['id']
    }
    })
    .then((typesList) => {
        if (typesList.length == 0) {
            res.status(404).json('0 Document Types found!');
        } else {
            res.status(200).json(typesList);
        }
    })
    .catch((error) => {
        res.status(500).json(error.toString());
    }) 
}

// falta parte do utilizador com autorização 
const update = (req, res) => {
    if (req.loggedUserType == 1) {
        DocumentType.update(req.body,{where: {id: req.params.documentTypeId, deleted: 0}})
        .then((num) => {
            if (num == 1) {
                res.status(200).json({message: `Document Type with id ${req.params.documentTypeId} updated with success!`});
            } else {
                res.status(400).json({message: 'Error while updating the Document Type!'});
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
    } else {
        res.status(400).json({message: 'Only admin and users with access can update Document Types!'});
    }
}

const remove = (req, res) => {
    if (req.loggedUserType == 1) {
        DocumentType.update(req.body,{where: {id: req.params.documentTypeId, deleted: 0}})
        .then((num) => {
            if (num == 1) {
                res.status(200).json({message: `Document Type with id ${req.params.documentTypeId} removed with success!`});
            } else {
                res.status(400).json({message: 'Error while removing the Document Type!'});
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
    } else {
        res.status(400).json({message: 'Only admin can remove Document Types!'});
    }
}

exports.create = create;
exports.listAll = listAll;
exports.update = update;
exports.remove = remove;