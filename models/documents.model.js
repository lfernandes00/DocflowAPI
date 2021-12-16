const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP2', 'joaoferr_ESMAPP_21_22_GRP2', 'W9dDquqxfG8PjWdK', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})
class Document extends Model {}

Document.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    dataVencimento: DataTypes.DATE,
    typeId: DataTypes.INTEGER,
    version: DataTypes.INTEGER,
    pending: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    description: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    extension: DataTypes.STRING,
    folderId: DataTypes.INTEGER,
    deleted: DataTypes.TINYINT,
}, { sequelize, modelName: 'document'})

sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.Document = Document;