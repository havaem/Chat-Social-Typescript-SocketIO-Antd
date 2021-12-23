const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema(
	{
		slug: {
			type: String,
			unique: true,
			default: "",
		},
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			default: "",
		},
		password: {
			type: String,
			required: true,
		},
		birthday: {
			type: Date,
			default: Date.now(),
		},
		avatar: {
			type: String,
			default: process.env.DEFAULT_AVATAR,
		},
		cover: {
			type: String,
			default: process.env.DEFAULT_COVER,
		},
		bio: {
			type: String,
			default: "",
		},
		sCoin: {
			type: Number,
			default: 100,
		},
		sExp: {
			type: Number,
			default: 0,
		},
		language: {
			type: String,
			default: "vi",
		},
		list: {
			friend_list: [
				{
					type: Schema.Types.ObjectId,
					ref: "User",
				},
			],
			white_list: [
				{
					type: Schema.Types.ObjectId,
					ref: "User",
				},
			],
			block_list: [
				{
					type: Schema.Types.ObjectId,
					ref: "User",
				},
			],
		},
		status: {
			is_admin: {
				type: Boolean,
				default: false,
			},
			is_active: {
				type: Boolean,
				default: true,
			},
			is_verified: {
				type: Boolean,
				default: false,
			},
		},
		last_online: {
			type: Date,
			default: Date.now(),
		},
		level: {
			type: Schema.Types.ObjectId,
			ref: "Level",
			default: "61b350f9f05eea9480095366",
		},
		social: [
			{
				type: Schema.Types.ObjectId,
				ref: "Social",
				username: {
					type: String,
					required: true,
				},
				status: {
					type: Boolean,
					default: false,
				},
			},
		],
		music: {
			type: Schema.Types.ObjectId,
			ref: "Music",
		},
	},
	{
		timestamps: true,
		strict: true,
	}
);
userSchema.pre("save", function (next) {
	const user = this;
	// if slug is empty means user is new
	if (!user.slug) user.slug = user._id;
	// if password <31 characters means it's not hashed
	if (user.password.length < 31) {
		bcrypt.hash(user.password, +process.env.SALT_ROUND, function (err, hash) {
			if (err) {
				next(err);
			} else {
				user.password = hash;
				next();
			}
		});
	} else next();
});
const User = mongoose.model("User", userSchema);
User.createIndexes();
module.exports = User;
