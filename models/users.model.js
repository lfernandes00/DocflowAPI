const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP2', 'joaoferr_ESMAPP_21_22_GRP2', 'W9dDquqxfG8PjWdK', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})
const Document = require('./documents.model');
const Folder = require('./folders.model');
const FolderAccess = require('./folderAccess.model');

class User extends Model {}

User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    reviewCount: DataTypes.INTEGER,
    aprovedCount: DataTypes.INTEGER,
    workerNumber: DataTypes.INTEGER,
    uploadCount: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    deleted: DataTypes.TINYINT,
}, { sequelize, modelName: 'user'})

Document.Document.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Document.Document, {foreignKey: 'userId'});

Folder.Folder.belongsToMany(User, {through: FolderAccess.FolderAccess, as: 'FolderAccess'});
User.belongsToMany(Folder.Folder, {through: FolderAccess.FolderAccess, as: 'FolderAccess'});

sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.User = User;