const Films = require("../models/films");
const WSClients = require("../models/ws_clients");

module.exports.FilmsAll = function (req, res, query) {
  console.log(query);
  Films.findAll()
    .then((films) => {
      const filmsJson = JSON.stringify(films);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(filmsJson);
    })
    .catch((err) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Ошибка при получении списка фильмов");
    });
};

module.exports.FilmsAdd = function (req, res, body) {
  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      console.log(data);
      Films.create({
        name: data.name,
        category_id: data.category_id,
        data_created: data.data_created,
        description: data.description,
        author: data.author,
        admin_id: data.admin_id,
      })
        .then(() => {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Данные о фильме успешно получены и добавлены в базу данных");
        })
        .catch((err) => {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Ошибка при добавлении фильма");
        });
    } catch (error) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Неверный формат JSON данных");
    }
  });
};
