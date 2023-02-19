const helmet = require("helmet");
const cors = require("cors");
const httpStatus = require("http-status");
const { sequelize } = require("./database/database");
const bodyParser = require("body-parser");
require("./models/Menu");
require("./models/Recipe");
require("./models/Category");
require("./models/Ingredient");
require("./models/associations");

const express = require("express");
const router = require("./routes/index");

require("dotenv").config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(port, () => {
      console.log(`App listening in port ${port}`);
    });
  } catch (error) {
    console.error(`An error ocurred: ${error.message}`);
  }
}

main();
