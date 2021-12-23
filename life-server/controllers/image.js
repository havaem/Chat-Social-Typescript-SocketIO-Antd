const Image = require("../models/Image");
const cloudinary = require("../utils/cloudinary");
exports.createOne = async (req, res, next) => {
	try {
		const imageUrl = await cloudinary.uploader.upload(req.file.path);
		// cloudinary.uploader.destroy();
		const image = await Image.create({
			name: imageUrl.original_filename,
			url: imageUrl.url,
			description: req.body.description,
			user: req.user._id,
			cloudinary_id: imageUrl.public_id,
		});
		res.status(201).json(image);
	} catch (error) {
		next(error);
	}
};
exports.getOne = async (req, res) => {
	try {
		const image = await Image.findById(req.params.id);
		res.status(200).json(image);
	} catch (error) {
		next(error);
	}
};
exports.updateOne = async (req, res) => {
	try {
		const image = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.status(200).json(image);
	} catch (error) {
		next(error);
	}
};
exports.deleteOne = async (req, res) => {
	try {
		const image = await Image.findByIdAndDelete(req.params.id);
		res.status(200).json(image);
	} catch (error) {
		next(error);
	}
};
exports.getAll = async (req, res) => {
	try {
		const images = await Image.find({});
		res.status(200).json(images);
	} catch (error) {
		next(error);
	}
};
exports.getImage = async (req, res) => {
	try {
		const image = await Image.findById(req.params.id);
		res.status(200).send(image.url);
	} catch (error) {
		next(error);
	}
};
