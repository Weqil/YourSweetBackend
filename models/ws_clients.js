const { DataTypes } = require('sequelize');
const {db} = require('../base/index');

const ClientsWS = db.define('client_ws',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true, 
        autoIncrement:true,
    },
    ws_id:{
        type:DataTypes.STRING,
        allowNull:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

module.exports = ClientsWS;
ClientsWS.sync().then(()=>{
    console.log('--------------------------------')
    console.log('      ClientsWS create             ')
    console.log('--------------------------------')
});