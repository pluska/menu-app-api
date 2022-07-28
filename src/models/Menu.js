const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const Recipe = require("./Recipe");

const Menu = sequelize.define("menus", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  week: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING,
  },
});

Menu.hasMany(Recipe, {
  foreingKey: "menuId",
  sourceKey: "id",
});

Recipe.belongsTo(Menu, {
  foreingKey: "menuId",
  targetId: "id",
});

module.exports = Menu;
