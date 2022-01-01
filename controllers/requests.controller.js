const Model = require('../models/requests.model');
const Request = Model.Request;

const create = (req, res) => {
    const newRequest = {
        userId: req.body.userId,
        documentId: req.body.documentId,
        type: req.body.type,
        pending: 0
    }

    Request.create(newRequest)
        .then((data) => {
            res.status(201).json({ message: `New Request created`, location: "/requests" + data.id })
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const listAll = (req, res) => {
    Request.findAll({where: {userId: req.loggedUserId}})
    .then((requestsList) => {
        if (requestsList.length == 0) {
            res.status(404).json({message: "0 Requests found!"});
        } else {
            res.status(200).json(requestsList);
        }
    })
    .catch((error) => {
        res.status(500).json(error.toString());
    })
}

const update = (req, res) => {
    if (req.loggedUserId == req.params.userId) {
        Request.update(req.body, { where: { userId: req.loggedUserId, documentId: req.params.documentId} })
            .then((num) => {
                if (num == 1) {
                    res.status(200).json({ message: `Request updated with success!` });
                } else {
                    res.status(400).json({ message: 'Error while updating the Request!' });
                }
            })
            .catch((error) => {
                res.status(500).json(error.toString());
            })
    } else {
        res.status(400).json({ message: 'Only user of request can update request!' });
    }
}

exports.create = create;
exports.listAll = listAll;
exports.update = update;