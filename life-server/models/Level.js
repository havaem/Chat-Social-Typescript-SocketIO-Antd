const mongoose = require("mongoose");
const { Schema } = mongoose;
const levelSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	price: {
		type: Number,
		default: 0,
	},
	icon: {
		type: String,
		default: "",
	},
	benefits: [
		{
			name: { type: String, default: "" },
			status: { type: Number, default: 0 },
		},
	],
});
const Level = mongoose.model("Level", levelSchema);
module.exports = Level;
