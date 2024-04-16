
const Sequelize = require('sequelize'); //Подключаю ORM

let db_conn;
 //Подключаю базу данных
 switch(process.env.DB_DRIVER) {
    case 'sqlite':
        db_conn = new Sequelize({ 
            dialect:'sqlite',  //Тип базы данных
            storage :'base/base.sqlite', //Путь добазы данных
        });
    break;
    case 'pgsql':
        // db_conn = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
        db_conn = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'postgres',
        });
    break;
 }
 const db = db_conn
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
    
})
.catch((error)=>{
    console.error(error);
});