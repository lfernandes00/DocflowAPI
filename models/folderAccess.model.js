const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP2', 'joaoferr_ESMAPP_21_22_GRP2', 'W9dDquqxfG8PjWdK', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})
const User = require('./users.model');
const Folder = require('./folders.model');
class FolderAccess extends Model {}

FolderAccess.init({
    userId: DataTypes.INTEGER,
    folderId: DataTypes.INTEGER,
    access: DataTypes.TINYINT,
    color: DataTypes.TINYINT,
}, { sequelize, modelName: 'folderAccess'})

// Folder.Folder.belongsToMany(User.User, {through: FolderAccess, as: 'FolderAccess'});
// User.User.belongsToMany(Folder.Folder, {through: FolderAccess, as: 'FolderAccess'});


sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.FolderAccess = FolderAccess;