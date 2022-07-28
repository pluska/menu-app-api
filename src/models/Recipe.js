const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Recipe = sequelize.define("recipes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Recipe;
