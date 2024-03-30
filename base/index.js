
const Sequelize = require('sequelize'); //Подключаю ORM

 //Подключаю базу данных
const db = new Sequelize({ 
  
    dialect:'sqlite',  //Тип базы данных
   
    storage :'base/base.sqlite', //Путь добазы данных
});


 //Экспортирую в другие модули базу данных
module.exports.db = db;

db.authenticate()
.then(()=>{
    console.log('=================================')
    console.log('||      database worked        ||')
    console.log('=================================')
    const Admins = require('../models/admins')
    const Films = require('../models/films')  
    const Categories = require('../models/categories')
    const Serials = require('../models/serials')
    const ClientsWS = require('../models/ws_clients')
    
})
.catch((error)=>{
    console.error(error);
});