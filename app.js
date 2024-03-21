const db = require('./base');
const http = require('http');
const port = 3500;
const Sequelize = require('sequelize');
const requestController = require('./controllers/main-controller');

http.createServer(function(request, response){
    console.clear();
    console.log('=================================');
    console.log('||     SERVER WORKED           ||');
    console.log('=================================');
    
  
    requestController(request,response);
}).listen(port);

