const { DataTypes } = require('sequelize');
const {db} = require('../base/index');
const Admins = require('./admins')
const Videos = db.define('Videos',{
    video_id:{
        type:DataTypes.INTEGER,
        primaryKey:true, 
        autoIncrement:true,
    },
    admin_id:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    path:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false  
    }
});

Videos.belongsTo(Admins,{
    foreignKey:'admin_id', //поле в модели films
    targetKey:'admin_id'
});



Videos.sync() // Синхронизируем модель

    .then(() => {
        console.log('--------------------------------')
        console.log('      Videos create             ')
        console.log('--------------------------------');
    })
    .catch(error => {
        console.error('Error syncing Admins:', error);
    });





