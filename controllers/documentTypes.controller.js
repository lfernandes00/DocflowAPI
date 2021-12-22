const Model = require('../models/documentTypes.model');
const DocumentType = Model.DocumentType;

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
            res.status(500).json(error);
        })
}

const listAll = (req, res) => {
    DocumentType.findAll({where: {deleted: 0}})
    .then((typesList) => {
        if (typesList.length == 0) {
            res.status(404).json('0 Document Types found!');
        } else {
            res.status(200).json(typesList);
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    }) 
}

// falta parte do utilizador com autorização 
const update = (req, res) => {
    if (req.loggedUserType == 1) {
        Folder.update(req.body,{where: {id: req.params.folderId, deleted: 0}})
        .then((num) => {
            if (num == 1) {
                res.status(200).json({message: `Folder with id ${req.params.folderId} updated with success!`});
            } else {
                res.status(400).json({message: 'Error while updating the Folder!'});
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } else {
        res.status(400).json({message: 'Only admin and users with access can update folders!'});
    }
}

const remove = (req, res) => {
    if (req.loggedUserType == 1) {
        Folder.update(req.body,{where: {id: req.params.folderId, deleted: 0}})
        .then((num) => {
            if (num == 1) {
                res.status(200).json({message: `Folder with id ${req.params.folderId} removed with success!`});
            } else {
                res.status(400).json({message: 'Error while removing the Folder!'});
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } else {
        res.status(400).json({message: 'Only admin can remove folders!'});
    }
}

exports.create = create;
exports.listAll = listAll;
exports.update = update;
exports.remove = remove;