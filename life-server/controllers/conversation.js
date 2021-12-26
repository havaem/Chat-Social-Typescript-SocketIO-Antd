const Conversation = require("../models/Conversation");

exports.createOne = async (req, res, next) => {
	try {
		const conversation = await Conversation.create(req.body);
		res.status(201).json(conversation);
	} catch (err) {
		next(err);
	}
};
exports.getOne = async (req, res, next) => {
	try {
		const conversation = await Conversation.findById(req.params.id);
		res.status(200).json(conversation);
	} catch (err) {
		next(err);
	}
};
exports.updateOne = async (req, res, next) => {
	try {
		const conversation = await Conversation.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.status(200).json(conversation);
	} catch (err) {
		next(err);
	}
};
exports.deleteOne = async (req, res, next) => {
	try {
		await Conversation.findByIdAndDelete(req.params.id);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
};
exports.getAll = async (req, res, next) => {
	try {
		const conversations = await Conversation.find();
		res.status(200).json(conversations);
	} catch (err) {
		next(err);
	}
};
