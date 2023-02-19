const httpStatus = require("http-status");
const Ingredient = require("../models/Ingredient");

const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    if (!ingredients) {
      res.status(httpStatus.NOT_FOUND);
    } else if (ingredients.length === 0) {
      res.status(httpStatus.NO_CONTENT).json(ingredients);
    }
    res.status(httpStatus.OK).json(ingredients);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByPk({ where: { id } });
    if (!ingredient) {
      res.status(httpStatus.NOT_FOUND);
    } else if (ingredient.length === 0) {
      res.status(httpStatus.NO_CONTENT);
    }
    res.status(httpStatus.OK).json(ingredient);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const createIngredient = async (res, req) => {
  const { name, description } = req.body;
  try {
    const newIngredient = await Ingredient.create({
      name,
      description,
    });
    res.status(httpStatus.OK).json(newIngredient);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const updateIngredient = async (req, res) => {
  const { id } = req.params.id;
  const { name, description } = req.body;
  try {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      res.status(httpStatus.NOT_FOUND);
    }
    ingredient.name = name;
    ingredient.description = description;
    await ingredient.save();
    res.status(httpStatus.OK).json(ingredient);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteIngredient = async (res, req) => {
  const { id } = req.params.id;
  try {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      res.status(httpStatus.NOT_FOUND);
    }
    await Ingredient.destroy({
      where: {
        id,
      },
    });
    res.status(httpStatus.OK).send;
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
