const { DataTypes } = require('sequelize');
const {db} = require('../base/index');
const VideosCount = db.define('VideosCount',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true, 
        autoIncrement:true,
    },
    value:{
        type:DataTypes.NUMBER,
        unique:true,
        allowNull:false
    }
})

VideosCount.sync() // Синхронизируем модель

    .then(() => {
        console.log('--------------------------------')
        console.log('      VideosCount create        ')
        console.log('--------------------------------');
    })
    .catch(error => {
        console.error('Error syncing Admins:', error);
    });

    
module.exports = VideosCount;