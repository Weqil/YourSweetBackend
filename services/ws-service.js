const { WebSocketServer } = require('ws');
const { v4: uuidv4 } = require('uuid');


const wsServer = null;
const clients = [];


module.exports.initWS = function (server) {
    this.wsServer = new WebSocketServer({server});
}

module.exports.connect = function () {
  this.wsServer.on('connection', function(connection) {
      const userId = uuidv4();
      const ClientsWS = require('../models/ws_clients')
      this.clients[userId] = connection;
      connection.send(JSON.stringify({"message":"Подключение установлено."}))
      ClientsWS.create({
        ws_id: userId,
        user_id: 1
      });
      connection.on('message', (message, isBinary) => {
        console.log(message);
      });
    });
}

module.exports.onMessage = function () {
  this.wsServer.on('message', (message) => {
    console.log('получено сообщение: %s', message);
  });
}

module.exports.getClients = function () {
    this.wsServer.clients
    return this.wsServer.clients
}