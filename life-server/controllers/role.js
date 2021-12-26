const Role = require("../models/Role");

exports.createOne = async (req, res, next) => {
	try {
		const role = await Role.create(req.body);
		res.status(201).json(role);
	} catch (err) {
		next(err);
	}
};
exports.getOne = async (req, res, next) => {
	try {
		const role = await Role.findById(req.params.id);
		res.status(200).json(role);
	} catch (err) {
		next(err);
	}
};
exports.updateOne = async (req, res, next) => {
	try {
		const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json(role);
	} catch (err) {
		next(err);
	}
};
exports.deleteOne = async (req, res, next) => {
	try {
		await Role.findByIdAndDelete(req.params.id);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
};
exports.getAll = async (req, res, next) => {
	try {
		const roles = await Role.find({
			room: req.params.roomId,
		});
		res.status(200).json(roles);
	} catch (err) {
		next(err);
	}
};
