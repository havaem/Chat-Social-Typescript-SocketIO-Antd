const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoleSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
		color: {
			type: String,
			required: true,
		},
		permissions: [
			{
				type: String,
				required: true,
			},
		],
		order: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;
