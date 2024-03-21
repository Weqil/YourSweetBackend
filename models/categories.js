const { DataTypes } = require('sequelize');
const {db} = require('../base/index');
const categories = db.define('Categories',{
    category_id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
});

module.exports = categories;

categories.sync().then(()=>{
    console.log('--------------------------------')
    console.log('      Categories create         ')
    console.log('--------------------------------');
})