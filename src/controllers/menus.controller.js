const httpStatus = require("http-status");
const Menu = require("../models/Menu");

const getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();

    if (!menus) {
      res.status(httpStatus.NOT_FOUND);
    }

    res.status(httpStatus.OK).json(menus);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk({ where: { id } });
    if (!menu) {
      res.status(httpStatus.NOT_FOUND);
    }
    res.status(httpStatus.OK).json(menu);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const createMenu = async (req, res) => {
  const { name, week, description } = req.body;
  try {
    const newMenu = await Menu.create({
      name,
      week,
      description,
    });
    res.status(httpStatus.OK).json(newMenu);
  } catch (error) {
    return res.status(httpStatus[500]).json({ message: error.message });
  }
};

const updateMenu = async (req, res) => {
  const { id } = req.params.id;
  const { name, week, description } = req.body;
  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      res.status(httpStatus.NOT_FOUND);
    }
    menu.name = name;
    menu.week = week;
    menu.description = description;
    await menu.save();
    res.status(httpStatus.OK).json(menu);
  } catch (error) {
    return res.status(httpStatus[500]).json({ message: error.message });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params.id;
  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      res.status(httpStatus.NOT_FOUND);
    }
    await Menu.destroy({
      where: {
        id,
      },
    });
    res.status(httpStatus.OK).send;
  } catch (error) {
    return res.status(httpStatus[500]).json({ message: error.message });
  }
};

module.exports = { getMenus, getMenu, createMenu, updateMenu, deleteMenu };
