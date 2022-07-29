const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Ingredient = sequelize.define("Ingredients", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Ingredient;
