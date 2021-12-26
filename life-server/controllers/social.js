const Social = require("../models/social.js");
exports.getAll = async (req, res, next) => {
	try {
		const socials = await Social.find({});
		res.status(200).json(socials);
	} catch (error) {
		next(error);
	}
};
exports.createOne = async (req, res, next) => {
	try {
		const social = await Social.create({ ...req.body });
		res.status(201).json({ social });
	} catch (error) {
		next(error);
	}
};
exports.getOne = async (req, res, next) => {
	try {
		const social = await Social.findById(req.params.id);
		if (!social) return res.status(404).json({ message: message.socialNotFound });
		res.status(200).json({ social });
	} catch (error) {
		next(error);
	}
};
exports.updateOne = async (req, res, next) => {
	try {
		const social = await Social.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!social) return res.status(404).json({ message: message.socialNotFound });
		res.status(200).json({ social });
	} catch (error) {
		next(error);
	}
};
exports.deleteOne = async (req, res, next) => {
	try {
		const social = await Social.findByIdAndDelete(req.params.id);
		if (!social) return res.status(404).json({ message: message.socialNotFound });
		res.status(200).json({ social });
	} catch (error) {
		next(error);
	}
};
