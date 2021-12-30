const Message = require("../models/Message");
const cloudinary = require("../utils/cloudinary");
exports.createOne = async (req, res, next) => {
	try {
		let images = [];
		for (let i = 0; req.files.length > i; i++) {
			let result = await cloudinary.uploader.upload(req.files[i].path);
			images.push(result.url);
		}
		let message = await Message.create({
			conversation: req.body.conversation,
			message: req.body.message,
			user: req.user._id,
			images: images,
		});
		await Message.populate(message, { path: "user", select: "name avatar" });
		res.status(201).json(message);
	} catch (err) {
		next(err);
	}
};
exports.getOne = async (req, res, next) => {
	try {
		const message = await Message.findById(req.params.id);
		res.status(200).json(message);
	} catch (err) {
		next(err);
	}
};
exports.updateOne = async (req, res, next) => {
	try {
		const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json(message);
	} catch (err) {
		next(err);
	}
};
exports.deleteOne = async (req, res, next) => {
	try {
		await Message.findByIdAndDelete(req.params.id);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
};
exports.deleteAll = async (req, res, next) => {
	try {
		await Message.deleteMany();
		res.status(204).end();
	} catch (err) {
		next(err);
	}
};
exports.getAll = async (req, res, next) => {
	try {
		const messages = await Message.find({
			room: req.params.roomId,
		});
		res.status(200).json(messages);
	} catch (err) {
		next(err);
	}
};
exports.getAllByUser = async (req, res, next) => {
	try {
		const messages = await Message.find({
			user: req.params.userId,
		});
		res.status(200).json(messages);
	} catch (err) {
		next(err);
	}
};
exports.getAllByConversation = async (req, res, next) => {
	try {
		const messages = await Message.find({
			conversation: req.params.conversationId,
		})
			.populate("user", "name avatar")
			.sort({ createdAt: 1 });
		res.status(200).json(messages);
	} catch (err) {
		next(err);
	}
};
