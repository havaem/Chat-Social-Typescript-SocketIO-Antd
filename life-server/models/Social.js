const mongoose = require("mongoose");
const { Schema } = mongoose;
const socialSchema = new Schema({
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
export default Social;
