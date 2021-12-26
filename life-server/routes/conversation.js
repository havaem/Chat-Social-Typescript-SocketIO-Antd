const express = require("express");
const { createOne, getOne, updateOne, deleteOne, getAll } = require("../controllers/conversation.js");
const Router = express.Router();

// Control
Router.route("/").get(getAll).post(createOne);
Router.route("/:id").get(getOne).put(updateOne).delete(deleteOne);

module.exports = Router;
