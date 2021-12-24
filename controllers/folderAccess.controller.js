const Model = require('../models/folderAccess.model');
const FolderAccess = Model.FolderAccess;

const create = (req, res) => {
    const newFolderAccess = {
        userId: req.body.userId,
        folderId: req.body.folderId,
        access: 0
    }

    FolderAccess.create(newFolderAccess)
        .then((data) => {
            res.status(201).json({ message: `New FolderAccess created`, location: "/folderAccess" + data.id })
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}
const update = (req, res) => {
    if (req.loggedUserType == 1) {
        FolderAccess.update(req.body, { where: { id: req.params.folderAccessId, deleted: 0 } })
            .then((num) => {
                if (num == 1) {
                    res.status(200).json({ message: `FolderAccess with id ${req.params.folderAccessId} updated with success!` });
                } else {
                    res.status(400).json({ message: 'Error while updating the FolderAccess!' });
                }
            })
            .catch((error) => {
                res.status(500).json(error.toString());
            })
    } else {
        res.status(400).json({ message: 'Only admin and users with access can update folderAccess!' });
    }
}

exports.create = create;
exports.update = update;