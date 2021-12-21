const express = require("express");
const { createOne, getOne, updateOne, deleteOne } = require("../controllers/level");
const Router = express.Router();

// Control
Router.route("/").post(createOne);
Router.route("/:id").get(getOne).put(updateOne).delete(deleteOne);

module.exports = Router;
