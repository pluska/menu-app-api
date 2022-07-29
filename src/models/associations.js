const Category = require("./Category");
const Ingredient = require("./Ingredient");
const Menu = require("./Menu");
const Recipe = require("./Recipe");

Menu.belongsToMany(Recipe, {
  through: "menu_recipe",
});

Category.hasMany(Recipe, {
  foreingKey: "categoryId",
});

Ingredient.belongsToMany(Recipe, {
  through: "ingredients_recipe",
});

Recipe.belongsTo(Category);

Recipe.belongsToMany(Menu, {
  through: "menu_recipe",
});

Recipe.belongsToMany(Ingredient, {
  through: "ingredients_recipe",
});
