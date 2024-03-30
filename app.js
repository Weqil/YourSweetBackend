const db = require('./base');
const { WebSocketServer } = require('ws');
const {connect, initWS} = require('./services/ws-service');
const http = require('http');
const port = process.env.APP_PORT || 3500;
const Sequelize = require('sequelize');
const requestController = require('./controllers/main-controller');


const server = http.createServer(function(request, response, clients){
    console.clear();
    console.log('=================================');
    console.log(`||     SERVER WORKED {$port}   ||`);
    console.log('=================================');
    requestController(request,response, clients);
});

initWS(server);
connect()

server.listen(port);
