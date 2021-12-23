const express = require("express");
const { createOne, getOne, getImage, updateOne, deleteOne, getAll } = require("../controllers/image");
const { currentUser } = require("../middlewares/currentUser");
const Router = express.Router();
const upload = require("../utils/multer");

Router.route("/").get(currentUser, getAll).post(currentUser, upload.single("avatar"), createOne);
Router.route("/:id").get(getOne).put(currentUser, updateOne).delete(currentUser, deleteOne);
Router.route("/storage/:id").get(getImage);
module.exports = Router;
