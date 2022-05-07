const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('sequelize_test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});


module.exports = sequelize;