const url = require("url");
const Films = require("../models/films");
const Categories = require("../models/categories");
const { createAdmins } = require("./admins-controller");

module.exports = function requestController(req, res, clints) {
  // Получаем query параметры
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;

  // Получаем тело запроса
  var body;
  req.on("data", (chunk) => {
    body = chunk.toString();
  });

  
  // Получаем путь из адреса
  const path = req.url.match("^[^?]*")[0];
  const parsedUrl = url.parse(req.url, true);// парсим путь и включаем параметры
  const id = parsedUrl.query.id
  console.log(path)
  switch (true) {
    case req.method === "GET" && path === "/admins":
      const { adminsAll } = require("./admins-controller");
      adminsAll(req, res, query);
      break;
    case req.method === "POST" && path === "/admins":
      const { adminsAdd } = require("./admins-controller");
      console.log(body)
      adminsAdd(req, res, body);
      break;
    case req.method === "GET" && path === "/films":
      const { FilmsAll } = require("./films-controller");
      FilmsAll(req, res, query);
      break;
    case req.method === "POST" && path === "/films":
      const { FilmsAdd } = require("./films-controller");
      FilmsAdd(req, res, body);
      break;
    case req.method === "GET" && path === "/categories":
      const { categoriesAll } = require("./categories-controller");
      categoriesAll(req, res, query);
      break;
    case req.method === "POST" && path === "/categories":
      const { createCategories } = require("./categories-controller");
      createCategories(req, res);
      break;
    case req.method === "POST" && path ==="/categories/rename":
      const { renameCategories } = require("./categories-controller");
      renameCategories(req, res, id);
    break;
    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Страницы не существует" }));
      break;
  }
};
