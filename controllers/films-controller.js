const { INTEGER } = require("sequelize");
const Films = require("../models/films");
const {getClients} = require("../services/ws-service")

module.exports.FilmsAll = async function (req, res, query) {

  const limit = query.limit ? query.limit : 10;
  const cursor = query.page ? Math.ceil(query.page) : 0;


  Films.findAndCountAll({
    offset: cursor,
    limit: limit,
    order: [["createdAt"]],
  }).then((films) => {
    films.count_page = Math.ceil(films.count / limit)
    films.next_page = cursor > 1 && films.rows.lenght > 1? cursor + 1 : 0;
    films.back_page = cursor > 1 && films.rows.lenght > 1? cursor - 1 : 0;
    films.page = cursor
    const filmsJson = JSON.stringify(films);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(filmsJson);
  }).catch((err) => {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
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
        .then((film) => {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Данные о фильме успешно получены и добавлены в базу данных");
          getClients().forEach(client => {
            client.send(JSON.stringify({
              "message":"На сайте появился новый фильм",
              "film":film
            }))
          });
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
