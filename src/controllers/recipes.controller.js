const httpStatus = require("http-status");
const Recipe = require("../models/Recipe");

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();

    if (!recipes) {
      res.status(httpStatus.NOT_FOUND);
    } else if (recipes.length === 0) {
      res.status(httpStatus.NO_CONTENT);
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
    const recipe = await Recipe.findOne({ where: { id: id } });
    if (!recipe) {
      res.status(httpStatus.NOT_FOUND);
    } else if (recipe.length === 0) {
      res.status(httpStatus.NO_CONTENT);
    }
    res.status(httpStatus.OK).json(recipe);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const createRecipe = async (req, res) => {
  const { name, description, eaters, repeat } = req.body;

  try {
    const newRecipe = await Recipe.create({
      name,
      description,
      eaters,
      repeat,
    });
    res.status(httpStatus.OK).json(newRecipe);
  } catch (error) {
    return res.status(httpStatus[500]).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, description, eaters, repeat } = req.body;
  try {
    console.log("Your recipe is" + req.params.id);
    const recipe = await Recipe.findOne({ where: { id: id } });
    if (recipe === null) {
      return res.status(httpStatus.NOT_FOUND);
    }
    recipe.name = name;
    recipe.description = description;
    recipe.eaters = eaters || 1;
    recipe.repeat = repeat || "DAILY";
    await recipe.save();
    return res
      .status(httpStatus.OK)
      .json({ message: "Recipe updated successfully", recipe });
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
