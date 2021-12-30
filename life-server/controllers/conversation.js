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
		const conversation = await Conversation.findById(req.params.id)
			.populate({
				path: "members",
				populate: {
					path: "role",
					select: "name color permissions",
				},
			})
			.populate({
				path: "members",
				populate: {
					path: "user",
					select: "name avatar slug",
				},
			});
		res.status(200).json(conversation);
	} catch (err) {
		next(err);
	}
};
exports.updateOne = async (req, res, next) => {
	try {
		const conversation = await Conversation.findByIdAndUpdate(req.params.id, req.body, { new: true })
			.populate({
				path: "members",
				populate: {
					path: "role",
					select: "name color permissions",
				},
			})
			.populate({
				path: "members",
				populate: {
					path: "user",
					select: "name avatar",
				},
			});
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
		const conversations = await Conversation.find({})
			.populate({
				path: "members",
				populate: {
					path: "role",
					select: "name color permissions",
				},
			})
			.populate({
				path: "members",
				populate: {
					path: "user",
					select: "name avatar",
				},
			});
		res.status(200).json(conversations);
	} catch (err) {
		next(err);
	}
};
