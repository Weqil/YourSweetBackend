const { DataTypes } = require('sequelize');
const {db} = require('../base/index');
const Admins = db.define('Admins',{
    admin_id:{
        type:DataTypes.INTEGER,
        primaryKey:true, 
        autoIncrement:true,
    },
    user_name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
});


Admins.sync() // Синхронизируем модель

    .then(() => {
        console.log('--------------------------------')
        console.log('      Admins create             ')
        console.log('--------------------------------');
    })
    .catch(error => {
        console.error('Error syncing Admins:', error);
    });

module.exports = Admins;




