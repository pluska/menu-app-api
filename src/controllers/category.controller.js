const httpStatus = require("http-status");
const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      res.status(httpStatus.NOT_FOUND);
    } else if (categories.length === 0) {
      res.status(httpStatus.NO_CONTENT).json(categories);
    }
    res.status(httpStatus.OK).json(categories);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk({ where: { id } });
    if (!category) {
      res.status(httpStatus.NOT_FOUND);
    } else if (category.length === 0) {
      res.status(httpStatus.NO_CONTENT);
    }
    res.status(httpStatus.OK).json(category);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const createCategory = async (res, req) => {
  const { name, description } = req.body;
  try {
    const newCategory = await Category.create({
      name,
      description,
    });
    res.status(httpStatus.OK).json(newCategory);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params.id;
  const { name, description } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(httpStatus.NOT_FOUND);
    }
    category.name = name;
    category.description = description;
    await category.save();
    res.status(httpStatus.OK).json(category);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteCategory = async (res, req) => {
  const { id } = req.params.id;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(httpStatus.NOT_FOUND);
    }
    await Category.destroy({
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
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
