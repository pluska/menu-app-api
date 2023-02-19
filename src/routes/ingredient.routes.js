const express = require("express");
const {
  getIngredients,
  createIngredient,
  updateIngredient,
  getIngredient,
  deleteIngredient,
} = require("../controllers/ingredient.controller");

const router = express.Router();

router.get("/", getIngredients);
router.post("/", createIngredient);
router.put("/:id", updateIngredient);
router.get("/:id", getIngredient);
router.delete("/:id", deleteIngredient);

module.exports = router;
