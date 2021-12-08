const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP2', 'joaoferr_ESMAPP_21_22_GRP2', 'W9dDquqxfG8PjWdK', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

class Client extends Model {}

Client.init({
    NIF: DataTypes.INTEGER,
    name: DataTypes.STRING,
    adress: DataTypes.STRING
}, { sequelize, modelName: 'client'})

sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.Client = Client;