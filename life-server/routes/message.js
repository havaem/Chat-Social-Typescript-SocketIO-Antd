const express = require("express");
const {
	createOne,
	getOne,
	updateOne,
	deleteOne,
	getAll,
	getAllByConversation,
} = require("../controllers/message.js");
const { currentUser } = require("../middlewares/currentUser.js");
const Router = express.Router();
const upload = require("../utils/multer");
// Control
Router.route("/").get(getAll).post(currentUser, upload.array("images"), createOne);
Router.route("/:id").get(getOne).put(updateOne).delete(deleteOne);
Router.route("/conversation/:conversationId").get(getAllByConversation);
module.exports = Router;
