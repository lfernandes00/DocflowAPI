const Model = require('../models/requests.model');
const Request = Model.Request;

const create = (req, res) => {
    const newRequest = {
        userId: req.body.userId,
        documentId: req.body.documentId,
        type: req.body.type,
        pending: 0,
        time: "",
        avaliation: 0
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
    Request.findAll({ where: { userId: req.loggedUserId } })
        .then((requestsList) => {
            if (requestsList.length == 0) {
                res.status(404).json({ message: "0 Requests found!" });
            } else {
                res.status(200).json(requestsList);
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const update = (req, res) => {
    let currentdate = new Date();
    let date2 = currentdate.getFullYear() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    Request.findOne({ where: { userId: req.loggedUserId, documentId: req.params.documentId } })
        .then((request) => {
            if (request === null) {
                res.status(404).json({ message: `Request not found!` });
            } else {
                if (req.loggedUserId == request.userId) {
                    let createDate = request.createdAt
                    let date1 = createDate.getFullYear() + "/"
                        + (createDate.getMonth() + 1) + "/"
                        + createDate.getDate() + " "
                        + createDate.getHours() + ":"
                        + createDate.getMinutes() + ":"
                        + createDate.getSeconds();

                    let mill = Math.abs(new Date(date1) - new Date(date2)) // difference in milliseconds
                    req.body.time =  mill;
                    
                    Request.update(req.body, { where: { userId: req.loggedUserId, documentId: req.params.documentId } })
                        .then((num) => {
                            if (num == 1) {
                                res.status(200).json({ message: `Request updated with success!` });
                            } else {
                                res.status(400).json({ message: 'Error while updating request!' });
                            }
                        })
                        .catch((error) => {
                            res.status(500).json(error.toString())
                        })
                } else {
                    res.status(400).json({ message: 'Only the user who created this request can remove it!' });
                }
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

exports.create = create;
exports.listAll = listAll;
exports.update = update;