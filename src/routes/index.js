const express = require("express");
const menuRoute = require("./menus.routes");
const recipesRoute = require("./recipe.routes");
const categoriesRoute = require("./category.routes");

const router = express.Router();

const routes = [
  {
    path: "/recipes",
    route: recipesRoute,
  },
  {
    path: "/menus",
    route: menuRoute,
  },
  {
    path: "/categories",
    route: categoriesRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
