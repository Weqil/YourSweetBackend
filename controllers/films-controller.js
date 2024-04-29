const Films = require("../models/films");
const path = require('path');
const fs = require('fs');
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
module.exports.FilmFiles = function (req, res){
  let body = Buffer.alloc(0); // Создаем пустой буфер для накопления данных

  req.on("data", (chunk) => {
    body = Buffer.concat([body, chunk]); // Накапливаем все чанки в буфере
  });

  req.on("end", () => {
    const filePath = './images/bebrunchink.mp4';

    // Записываем данные в файл
    fs.writeFile(filePath, body, (err) => {
      if (err) {
        console.error('Ошибка при сохранении файла:', err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "ошибка при сохранении файла" }));
      } else {
        console.log('Файл успешно сохранен:', filePath);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "файл успешно сохранен" }));
      }
    });
  });
}

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
