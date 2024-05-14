const Films = require("../models/films");
const path = require('path');
const fs = require('fs');
const {reqOnBody} = require("../utlis/body-parse")
const VideosCount = require("../models/videosCount");

module.exports.FilmsAll = function (req, res, query) {
  let offset = 0;
  const limit = 10;
  Films.findAll({
    limit,
    offset
  })
    .then((films) => {
      const filmsJson = JSON.stringify(films);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(filmsJson);
      offset += limit;
    })
    .catch((err) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Ошибка при получении списка фильмов");
    });
};

module.exports.FilmVideoFile = function(req, res){
  let fileName = 0
  let body = []
  let filePath = ''
  req.on("data", (chunk)=>{
    body.push(chunk)
  })

  req.on("end", () => {
    body = Buffer.concat(body);
    VideosCount.findByPk(1).then((file) => {
      file.value = file.value + 1;
      fileName = file.value;
      return file.save().then(() => {
        filePath = `./storage/filmVideo/${"FilmNumber_"+fileName}.mp4`;
        
        fs.writeFile(filePath, body, (err) => {
          if (err) {
            console.error('Ошибка при записи файла:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Ошибка сервера' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify({ path: `filmVideo/${"FilmNumber_"+fileName}.mp4` }));

          }
        });
      });
    }).catch((error) => {
      console.error('Ошибка при обновлении VideosCount:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Ошибка сервера' }));
    });
  });
}

module.exports.FilmAvatarFile = function (req, res){
  let fileName = 0
  let body = []
  let filePath = ''
  req.on("data", (chunk)=>{
    body.push(chunk)
  })

  req.on("end", () => {
    body = Buffer.concat(body);
    VideosCount.findByPk(1).then((file) => {
      file.value = file.value + 1;
      fileName = file.value;
      return file.save().then(() => {
        filePath = `./storage/filmAvatar/${"FilmNumber_"+fileName}.jpg`;
        
        fs.writeFile(filePath, body, (err) => {
          if (err) {
            console.error('Ошибка при записи файла:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Ошибка сервера' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify({ path: `filmAvatar/${"FilmNumber_"+fileName}.jpg` }));
          }
        });
      });
    }).catch((error) => {
      console.error('Ошибка при обновлении VideosCount:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Ошибка сервера' }));
    });
  });
}


module.exports.FilmsAdd = function (req, res,) {
  let body = ''
  req.on("data", (chunk) => {
    body = body + chunk.toString();
  });

  req.on("end", () => {
    data = JSON.parse(body);
    console.log(data)
      Films.create({
        name: data.name,
        category_id: data.category_id,
        data_created: data.data_created,
        description: data.description,
        author: data.author,
        admin_id: data.admin_id,
        avatar: data.avatar,
        video: data.video
      })
        .then(() => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(JSON.stringify({ message: 'фильм создан успешно'}));
        })
        .catch((err) => {
          console.log(err)
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Ошибка при добавлении фильма");
        });
  });
};
