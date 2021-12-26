const mongoose = require("mongoose");
const { Schema } = mongoose;
const socialSchema = new Schema({
	icon: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	prefix: {
		type: String,
		required: true,
	},
});
const Social = mongoose.model("Social", socialSchema);
module.exports = Social;
