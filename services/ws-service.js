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
      onMessage(connection)
    });
}

module.exports.getClients = function () {
    this.wsServer.clients
    return this.wsServer.clients
}

function onMessage (connection) {
  connection.on('message', async (message, isBinary) => {
    const message_str = await JSON.parse(message)
    console.log(message_str);
  });
}