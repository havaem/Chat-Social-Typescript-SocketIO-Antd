const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		cloudinary_id: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;
