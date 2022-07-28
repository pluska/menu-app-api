const express = require("express");
const {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipe,
} = require("../controllers/recipes.controller");
const router = express.Router();

router.get("/", getRecipes);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);
router.get("/:id", getRecipe);

module.exports = router;
