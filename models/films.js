const { DataTypes } = require('sequelize');
const {db} = require('../base/index');
const Admins = require('./admins')
const Categories = require('./categories')

const Films = db.define('Films',{
   film_id:{
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
   admin_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
   },
   avatar:{
    type:DataTypes.STRING,
    allowNull:false,
   }
});

Films.belongsTo(Admins,{
    foreignKey:'admin_id', //поле в модели films
    targetKey:'admin_id'
});

Films.belongsTo(Categories,{
    foreignKey:'category_id', //поле в модели films
    targetKey:'category_id'
})

module.exports = Films;
Films.sync().then(()=>{
    console.log('--------------------------------')
    console.log('      Films create             ')
    console.log('--------------------------------')
});

