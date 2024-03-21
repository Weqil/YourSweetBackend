const { DataTypes } = require('sequelize');
const { db } = require('../base/index');
const Admins = require('./admins')
const Categories = require('./categories')

const Serials = db.define('Serials',{
   serial_id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
   },
   name:{
    type:DataTypes.STRING,
    allowNull:false,
   },
   category_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
   },

   data_created:{
    type:DataTypes.STRING,
    allowNull:false,
   },

   description:{
    type:DataTypes.STRING,
    allowNull:false,
   },
   author:{
    type:DataTypes.STRING,
    allowNull:false,
   },

   category_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
   },
   admin_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
   }
});

Serials.belongsTo(Admins,{
    foreignKey:'admin_id', //поле в модели films
    targetKey:'admin_id'
});

Serials.belongsTo(Categories,{
    foreignKey:'category_id', //поле в модели films
    targetKey:'category_id'
})

// Синхронизируем модель в другом месте, а не здесь
// module.exports = Admins; 

Serials.sync() // Синхронизируем модель
    .then(() => {
        console.log('--------------------------------')
        console.log('      Serials create             ')
        console.log('--------------------------------');
    })
    .catch(error => {
        console.error('Error syncing Admins:', error);
    });

module.exports = Serials; // Экспортируем модель
