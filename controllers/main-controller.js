const url = require('url')
const Films = require('../models/films')
const Categories = require('../models/categories');
const {createAdmins} = require('./admins-controller')
module.exports = function requestController(req, res) {
    if (req.method === 'GET' && req.url === '/admins') {
        const {adminsAll} = require('./admins-controller')
        adminsAll(req,res)
    } 

    else if( req.method === 'POST' && req.url === '/admins/add'){
        const {adminsAdd} = require('./admins-controller')
        adminsAdd(req, res)
    }
    
   
    else if (req.method === 'GET' && req.url === '/films') {
        const {FilmsAll} = require('./films-controller')
        FilmsAll(req,res)
    } 

    else if (req.method === 'POST' && req.url === '/films/add') {
        const {FilmsAdd} = require('./films-controller')
        FilmsAdd(req,res)
    } 
    else if (req.method === 'GET' && req.url === '/categories') {
        const {categoriesAll} = require('./categories-controller')
        categoriesAll(req,res)
    } 
    else if(req.method === 'POST' && req.url === '/categories/add'){
        const {createCategories} = require('./categories-controller')
        createCategories(req,res)
    }

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Страницы не существует' }));
    }
}
