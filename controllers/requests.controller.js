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
                    var seconds = (mill / 1000).toFixed(0);
                    var minutes = Math.floor(seconds / 60);
                    var hours = "";
                    if (minutes > 59) {
                        hours = Math.floor(minutes / 60);
                        hours = (hours >= 10) ? hours : "0" + hours;
                        minutes = minutes - (hours * 60);
                        minutes = (minutes >= 10) ? minutes : "0" + minutes;
                    }

                    seconds = Math.floor(seconds % 60);
                    seconds = (seconds >= 10) ? seconds : "0" + seconds;
                    if (hours != "") {
                        req.body.time = hours + " horas " + minutes + " min";
                    }
                    req.body.time =  minutes + " min " + seconds + " sec";
                    
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