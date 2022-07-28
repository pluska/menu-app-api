const express = require("express");
const {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenu,
} = require("../controllers/menus.controller");

const router = express.Router();

router.get("/", getMenus);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);
router.get("/:id", getMenu);

module.exports = router;
