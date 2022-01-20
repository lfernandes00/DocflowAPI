const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP2', 'joaoferr_ESMAPP_21_22_GRP2', 'W9dDquqxfG8PjWdK', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})



class Notification extends Model {}

Notification.init({
    userId: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    date: DataTypes.DATE,
    deleted: DataTypes.TINYINT
}, { sequelize, modelName: 'notification'})


sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.Notification = Notification;