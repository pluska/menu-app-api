const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.get("/:id", getCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
