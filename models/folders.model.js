const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP2', 'joaoferr_ESMAPP_21_22_GRP2', 'W9dDquqxfG8PjWdK', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

class Folder extends Model {}

Folder.init({
    name: DataTypes.STRING,
    deleted: DataTypes.TINYINT
}, { sequelize, modelName: 'folder'})

sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.Folder = Folder;