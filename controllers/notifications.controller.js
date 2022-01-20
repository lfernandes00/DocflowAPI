const Model = require('../models/notifications.model');
const Notification = Model.Notification;

const create = (req, res) => {
    let currentdate = new Date();
    let date2 = currentdate.getFullYear() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    const newNotification = {
        userId: req.body.userId,
        desc: req.body.desc,
        date: date2,
        deleted: 0
    }

    Notification.create(newNotification)
        .then((data) => {
            res.status(201).json({ message: `New Notification Created`, location: "/notifications" + data.id })
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const listByUser = (req, res) => {
    Notification.findAll({ where: { userId: req.params.userId, deleted: 0 } })
        .then((notificationsList) => {
            if (notificationsList === null) {
                res.status(404).json({ message: '0 notifications found!' });
            } else {
                res.status(200).json(notificationsList);
            }
        })
        .catch((error) => {
            res.status(500).json(error.toString());
        })
}

const remove = (req, res) => {
    Notification.findOne({where: {id: req.params.notificationId, deleted: 0}})
    .then((notification) => {
        if (notification === null) {
            res.status(404).json({message: `Notification with id ${req.params.notificationId} not found!`});
        } else {
            if (req.loggedUserId == notification.userId || req.loggedUserType == 1) {
                Notification.update(req.body, {where: {id: req.params.notificationId, deleted: 0}})
                .then((num) => {
                    if (num == 1) {
                        res.status(200).json({message: `Notification with id ${req.params.notificationId} removed with success!`});
                    } else {
                        res.status(400).json({message: 'Error while removing notification!'});
                    }
                })
                .catch((error) => {
                    res.status(500).json(error.toString())
                })
            } else {
                res.status(400).json({message: 'Only admin or the user who created this notification can remove it!'});
            }
        }
    })
    .catch((error) => {
        res.status(500).json(error.toString());
    })
}

exports.create = create;
exports.listByUser = listByUser;
exports.remove = remove;