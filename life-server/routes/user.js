const express = require("express");
const { currentUser } = require("../middlewares/currentUser");
const {
	login,
	register,
	getCurrentUser,
	loginGoogle,
	verifyUser,
	forgetPassword,
	resetPassword,
	changePassword,
	updateUser,
} = require("../controllers/user");
const Router = express.Router();

// Control
Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/loginGoogle").post(loginGoogle);
Router.route("/password").post(forgetPassword).put(resetPassword).patch(currentUser, changePassword);
Router.route("/").get(currentUser, getCurrentUser).post(verifyUser).put(currentUser, updateUser);
//Setting
module.exports = Router;
