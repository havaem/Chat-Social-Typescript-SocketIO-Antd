const Level = require("../models/Level");

exports.createOne = async (req, res) => {
	try {
		const level = await Level.create(req.body);
		res.status(201).json(level);
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
exports.getOne = async (req, res) => {
	try {
		const level = await Level.findById(req.params.id);
		res.status(200).json(level);
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
exports.updateOne = async (req, res) => {
	try {
		const level = await Level.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json(level);
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
exports.deleteOne = async (req, res) => {
	try {
		const level = await Level.findByIdAndDelete(req.params.id);
		res.status(200).json(level);
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
