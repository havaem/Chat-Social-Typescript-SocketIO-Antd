const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new Schema(
	{
		conversation: {
			type: Schema.Types.ObjectId,
			ref: "Conversation",
		},
		message: {
			type: String,
			required: true,
		},
		images: [
			{
				type: String,
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		repTo: {
			type: Schema.Types.ObjectId,
			ref: "Message",
			default: null,
		},
	},
	{
		timestamps: true,
	}
);
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
