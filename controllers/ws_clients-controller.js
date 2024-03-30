const ClientsWS = require("../models/ws_clients");
const { getClients } = require('../services/ws-service')
const { WebSocketServer } = require('ws');

// module.exports.createAdmins = Admins.bulkCreate(adm)

module.exports.clientAll = function (req, res, query) {
  ClientsWS.findAll()
    .then((clients) => {
      // console.log(ws_clients)
      getClients().forEach(client => {
        client.send(JSON.stringify({"message":"Просмотрены все клиенты, сообщение отправлено всем."}))
      });
      const clientsJson = JSON.stringify(clients);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(clientsJson);
    })
    .catch((err) => {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    });
};