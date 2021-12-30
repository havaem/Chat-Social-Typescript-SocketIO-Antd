// const mongoose = require("mongoose");
const User = require("../models/User");
const Conversation = require("../models/Conversation");
const { comparePassword, userDataResponse, signTokenNoExpired, signToken } = require("../utils");
const { google } = require("googleapis");
const { message } = require("../message");
const sendEmail = require("./sendMail");
const jwt = require("jsonwebtoken");
const oauth2Client = new google.auth.OAuth2(process.env.YOUR_CLIENT_ID, process.env.CLIENT_SECRET);
exports.register = async (req, res, next) => {
	try {
		const user = await User.create({ ...req.body });
		await sendEmail(
			req.body.email,
			process.env.CLIENT_URL + "/verify/" + signTokenNoExpired({ _id: user._id, for: "verify" }),
			"Verify your account",
			"Click me to verify"
		);
		const conversation = await Conversation.findById("61c74b80c9de5ae944e64903");
		conversation.members.push({ user: user._id });
		await conversation.save();
		res.status(201).json({
			message: message.userCreated,
		});
	} catch (error) {
		next(error);
	}
};
exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username }).populate({
			path: "social",
			populate: {
				path: "social_id",
				select: "icon name prefix",
			},
		});
		if (!user) return res.status(401).json({ message: message.userNotFound });
		const isMatch = await comparePassword(password, user.password);
		if (!isMatch) return res.status(401).json({ message: message.userWrongPassword });
		// * Start check
		if (!user.status.is_verified) return res.status(401).json({ message: message.userVerify });
		if (!user.status.is_active) return res.status(401).json({ message: message.userWasBanned });
		// * End check
		res.status(200).json({
			...userDataResponse(user),
		});
	} catch (error) {
		next(error);
	}
};
exports.getCurrentUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.user._id }).populate({
			path: "social",
			populate: {
				path: "social_id",
				select: "icon name prefix",
			},
		});
		if (user) {
			// * Start check
			if (!user.status.is_verified) return res.status(401).json({ message: message.userVerify });
			if (!user.status.is_active) return res.status(401).json({ message: message.userWasBanned });
			// * End check
			res.status(200).json({
				...userDataResponse(user),
			});
		}
	} catch (error) {
		next(error);
	}
};
exports.loginGoogle = async (req, res, next) => {
	try {
		const data = await oauth2Client.verifyIdToken({ idToken: req.body.token });
		const { email, name, picture, email_verified } = data.payload;
		if (!email_verified) {
			return res.status(401).json({ message: message.userEmailNotVerified });
		}
		const user = await User.findOne({ email }).populate({
			path: "social",
			populate: {
				path: "social_id",
				select: "icon name prefix",
			},
		});
		if (user) {
			// * Start check
			if (!user.status.is_verified) return res.status(401).json({ message: message.userVerify });
			if (!user.status.is_active) return res.status(401).json({ message: message.userWasBanned });
			// * End check
			res.status(200).json({
				...userDataResponse(user),
			});
		} else {
			let newUser = await User.create({
				email,
				username: email.slice(0, email.indexOf("@")),
				name,
				avatar: picture,
				password: process.env.DEFAULT_PASSWORD,
				status: {
					is_verified: true,
				},
			});
			newUser = await newUser.populate("level", "name benefits");

			const conversation = await Conversation.findById("61c74b80c9de5ae944e64903");
			conversation.members.push({ user: newUser._id });
			await conversation.save();
			res.status(201).json({
				...userDataResponse(newUser),
			});
		}
	} catch (error) {
		next(error);
	}
};
exports.verifyUser = async (req, res, next) => {
	try {
		const { token } = req.body;
		const { _id, for: type } = jwt.verify(token, process.env.APP_KEY_SECRET).data;
		if (_id && type === "verify") {
			const user = await User.findOne({ _id });
			if (user && !user.status.is_verified) {
				user.status.is_verified = true;
				await User.findOneAndUpdate({ _id }, { status: user.status });
				res.status(200).json({
					message: message.userVerified,
				});
			} else {
				res.status(400).json({
					message: message.userVerified,
				});
			}
		}
	} catch (error) {
		next(error);
	}
};
exports.forgetPassword = async (req, res, next) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ message: message.userNotFound });
		await sendEmail(
			email,
			process.env.CLIENT_URL + "/reset-password/" + signToken({ _id: user._id, for: "reset" }, 10),
			"Reset your password",
			"Click me to reset"
		);
		res.status(200).json({
			message: message.userForgetPassword,
		});
	} catch (error) {
		next(error);
	}
};
exports.resetPassword = async (req, res, next) => {
	try {
		const { token } = req.body;
		const { _id, for: type } = jwt.verify(token, process.env.APP_KEY_SECRET).data;
		if (_id && type === "reset") {
			const user = await User.findOne({ _id });
			if (user) {
				user.password = req.body.password;
				await user.save();
				res.status(200).json({
					message: message.userResetPassword,
				});
			}
		}
	} catch (error) {
		next(error);
	}
};
exports.changePassword = async (req, res) => {
	try {
		const { password, newPassword } = req.body;
		const user = await User.findOne({ _id: req.user._id });
		if (!user) return res.status(401).json({ message: message.userNotFound });
		const isMatch = await comparePassword(password, user.password);
		if (!isMatch) return res.status(401).json({ message: message.userWrongPassword });
		user.password = newPassword;
		await user.save();
		res.status(200).json({
			message: message.userChangePassword,
		});
	} catch (error) {
		next(error);
	}
};
exports.updateUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.user._id });
		if (!user) return res.status(401).json({ message: message.userNotFound });
		const { bio, name, email, slug, language, avatar, phone, birthday, social } = req.body;
		if (email) user.email = email;
		if (bio) user.bio = bio;
		if (slug) user.slug = slug;
		if (language) user.language = language;
		if (name) user.name = name;
		if (avatar) user.avatar = avatar;
		if (social) user.social = social;
		if (birthday) user.birthday = birthday;
		if (phone) user.phone = phone;
		await user.save();
		const dataResponse = userDataResponse(
			await user.populate({
				path: "social",
				populate: {
					path: "social_id",
					select: "icon name prefix",
				},
			})
		);
		delete dataResponse.token;
		res.status(200).json({
			message: message.userUpdate,
			...dataResponse,
		});
	} catch (error) {
		next(error);
	}
};
exports.getInfoUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ slug: req.params.slug }).populate({
			path: "social",
			populate: {
				path: "social_id",
				select: "icon name prefix",
			},
		});
		if (!user) return res.status(401).json({ message: message.userNotFound });
		const dataResponse = userDataResponse(
			await user.populate({
				path: "social",
				populate: {
					path: "social_id",
					select: "icon name prefix",
				},
			})
		);
		delete dataResponse.token;
		res.status(200).json({ ...dataResponse });
	} catch (error) {
		console.log("error: ", error);
		next(error);
	}
};
