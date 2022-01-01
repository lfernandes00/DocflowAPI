const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP2', 'joaoferr_ESMAPP_21_22_GRP2', 'W9dDquqxfG8PjWdK', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})
class Request extends Model {}

Request.init({
    userId: DataTypes.INTEGER,
    documentId: DataTypes.INTEGER,
    type: DataTypes.TINYINT,
    pending: DataTypes.TINYINT,
}, { sequelize, modelName: 'request'})



sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.Request = Request;