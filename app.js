const db = require('./base');
const http = require('http');
const port = 3500;
const Sequelize = require('sequelize');
const requestController = require('./controllers/main-controller');

http.createServer(function(request, response){
    // Устанавливаем заголовки для CORS
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    response.setHeader("Access-Control-Allow-Credentials", true);
    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }
    
    console.clear();
    console.log('=================================');
    console.log('     SERVER WORKED           ');
    console.log('=================================');
    
    requestController(request, response);
}).listen(port);
