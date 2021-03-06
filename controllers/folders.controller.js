const Model = require('../models/folders.model');
const Folder = Model.Folder;
const Model2 = require('../models/documents.model');
const Document = Model2.Document;
const Model3 = require('../models/users.model');
const User = Model3.User;
const accessFolder = require('../models/folderAccess.model');
const FolderAccess = accessFolder.FolderAccess;

const create = (req, res) => {
    const newFolder = {
        name: req.body.name,
        deleted: 0
    }

    Folder.create(newFolder)
        .then((data) => {
            res.status(201).json({ message: `New Folder created`, location: "/folders" + data.id })
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const listAll = (req, res) => {
    Folder.findAll({
        where: { deleted: 0 },
        include: [
        {
            model: Document, attributes: ['name']
        },
        {
            model: User, as: 'FolderAccess', attributes: ['id']
        }
    ]
    })
        .then((foldersList) => {
            if (foldersList.length == 0) {
                res.status(404).json('0 folders found!');
            } else {
                res.status(200).json(foldersList);
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json(error.toString());
        })
}

const update = (req, res) => {
    FolderAccess.findOne({where: {folderId: req.params.folderId, userId: req.loggedUserId}})
    .then((folderAccess) => {
        if (folderAccess === null) {
            res.status(404).json({message: `Folder with id ${req.params.folderId} not found!`});
        } else {
            if (folderAccess.access == 1 || req.loggedUserType == 1) {
                Folder.update(req.body, {where: {id: req.params.folderId, deleted: 0}})
                .then((num) => {
                    if (num == 1) {
                        res.status(200).json({message: `Folder with id ${req.params.folderId} updated with success!`});
                    } else {
                        res.status(400).json({message: 'Error while updating the folder!'});
                    }
                })
                .catch((error) => {
                    res.status(500).json(error.toString());
                })
            } else {
                res.status(400).json({message: 'Only admins and authorized users can update folders!'});
            }
        }
    }).
    catch((error) => {
        res.status(500).json(error.toString());
    })
}

const remove = (req, res) => {
    if (req.loggedUserType == 1) {
        Folder.update(req.body, { where: { id: req.params.folderId, deleted: 0 } })
            .then((num) => {
                if (num == 1) {
                    res.status(200).json({ message: `Folder with id ${req.params.folderId} removed with success!` });
                } else {
                    res.status(400).json({ message: 'Error while removing the Folder!' });
                }
            })
            .catch((error) => {
                res.status(500).json(error.toString());
            })
    } else {
        res.status(400).json({ message: 'Only admin can remove folders!' });
    }
}

exports.create = create;
exports.listAll = listAll;
exports.update = update;
exports.remove = remove;