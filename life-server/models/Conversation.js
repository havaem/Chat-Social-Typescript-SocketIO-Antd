const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ConversationSchema = new Schema({
	members: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			role: {
				type: Schema.Types.ObjectId,
				ref: "Role",
				default: "61c74a69b9a5ec620fa79435",
			},
		},
	],
	type: {
		type: String,
		enum: ["private", "group"],
		default: "private",
	},
	settings: [
		{
			name: {
				type: String,
				required: true,
			},
			value: {
				type: Schema.Types.Mixed,
				required: true,
			},
		},
	],
});
const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;
