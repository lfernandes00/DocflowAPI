const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP2', 'joaoferr_ESMAPP_21_22_GRP2', 'W9dDquqxfG8PjWdK', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})
const Document = require('./documents.model');
const User = require('./users.model');
const FolderAccess = require('./folderAccess.model')
class Folder extends Model {}

Folder.init({
    name: DataTypes.STRING,
    deleted: DataTypes.TINYINT
}, { sequelize, modelName: 'folder'})

Document.Document.belongsTo(Folder, {foreignKey: "folderId"});
Folder.hasMany(Document.Document, {foreignKey: "folderId"})



sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.Folder = Folder;