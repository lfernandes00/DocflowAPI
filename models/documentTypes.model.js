const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP2', 'joaoferr_ESMAPP_21_22_GRP2', 'W9dDquqxfG8PjWdK', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})
const Document = require('./documents.model');
class DocumentType extends Model {}

DocumentType.init({
    name: DataTypes.STRING,
    deleted: DataTypes.TINYINT
}, { sequelize, modelName: 'documentType'})

Document.Document.belongsTo(DocumentType, {foreignKey: "typeId"});
DocumentType.hasMany(Document.Document, {foreignKey: "typeId"})

sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.DocumentType = DocumentType;