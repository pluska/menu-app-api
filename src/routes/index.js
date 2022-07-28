const express = require("express");
const menuRoute = require("./menus.routes");
const recipesRoute = require("./recipe.routes");

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
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
