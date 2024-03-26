const url = require("url");
const Films = require("../models/films");
const Categories = require("../models/categories");
const { createAdmins } = require("./admins-controller");

module.exports = function requestController(req, res) {
  // Получаем query параметры
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  // Получаем тело запроса
  var body;
  req.on("data", (chunk) => {
    body = chunk.toString();
  });

  // Устанавливаем заголовки для CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Получаем путь из адреса
  const path = req.url.match("^[^?]*")[0];
  switch (true) {
    case req.method === "GET" && path === "/admins":
      const { adminsAll } = require("./admins-controller");
      adminsAll(req, res, query);
      break;
    case req.method === "POST" && path === "/admins":
      const { adminsAdd } = require("./admins-controller");
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
      createCategories(req, res, body);
      break;
    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Страницы не существует" }));
      break;
  }

  //   if (req.method === "GET" && path === "/admins") {
  //     const { adminsAll } = require("./admins-controller");
  //     adminsAll(req, res);
  //   } else if (req.method === "POST" && path === "/admins/add") {
  //     const { adminsAdd } = require("./admins-controller");
  //     adminsAdd(req, res);
  //   } else if (req.method === "GET" && path === "/films") {
  //     const { FilmsAll } = require("./films-controller");
  //     FilmsAll(req, res);
  //   } else if (req.method === "POST" && path === "/films/add") {
  //     const { FilmsAdd } = require("./films-controller");
  //     FilmsAdd(req, res);
  //   } else if (req.method === "GET" && path === "/categories") {
  //     const { categoriesAll } = require("./categories-controller");
  //     categoriesAll(req, res);
  //   } else if (req.method === "POST" && path === "/categories/add") {
  //     const { createCategories } = require("./categories-controller");
  //     createCategories(req, res);
  //   } else {
  //     res.writeHead(404, { "Content-Type": "application/json" });
  //     res.end(JSON.stringify({ error: "Страницы не существует" }));
  //   }
};
