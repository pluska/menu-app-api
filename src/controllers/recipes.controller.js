const httpStatus = require("http-status");
const Recipe = require("../models/Recipe");

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();

    if (!recipes) {
      res.status(httpStatus.NOT_FOUND);
    }

    res.status(httpStatus.OK).json(recipes);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk({ where: { id } });
    if (!recipe) {
      res.status(httpStatus.NOT_FOUND);
    }
    res.status(httpStatus.OK).json(recipe);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const createRecipe = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newRecipe = await Recipe.create({
      name,
      description,
    });
    res.status(httpStatus.OK).json(newRecipe);
  } catch (error) {
    return res.status(httpStatus[500]).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params.id;
  const { name, week, description } = req.body;
  try {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      res.status(httpStatus.NOT_FOUND);
    }
    recipe.name = name;
    recipe.week = week;
    recipe.description = description;
    await recipe.save();
    res.status(httpStatus.OK).json(recipe);
  } catch (error) {
    return res.status(httpStatus[500]).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params.id;
  try {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      res.status(httpStatus.NOT_FOUND);
    }
    await Recipe.destroy({
      where: {
        id,
      },
    });
    res.status(httpStatus.OK).send;
  } catch (error) {
    return res.status(httpStatus[500]).json({ message: error.message });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
