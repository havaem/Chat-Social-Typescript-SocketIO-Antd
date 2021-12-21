const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { message } = require("../message");
//function convert vietnamese to slug
exports.convertToSlug = (str) => {
	// Chuyển hết sang chữ thường
	str = str.toLowerCase();

	// xóa dấu
	str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
	str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
	str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
	str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
	str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
	str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
	str = str.replace(/(đ)/g, "d");

	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, "");

	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, "-");

	// xóa phần dự - ở đầu
	str = str.replace(/^-+/g, "");
	return str;
};
exports.signTokenNoExpired = (data) => {
	return jwt.sign(
		{
			data,
		},
		process.env.APP_KEY_SECRET
	);
};
exports.signToken = (data, minutes) => {
	return jwt.sign(
		{
			data,
		},
		process.env.APP_KEY_SECRET,
		{ expiresIn: 60 * minutes }
	);
};
exports.verifyToken = (token) => {
	return jwt.verify(token, process.env.APP_KEY_SECRET);
};

exports.comparePassword = async (password, hash) => {
	return bcrypt.compare(password, hash);
};

exports.getTypeUsername = (username) => {
	if (username.includes("@")) {
		return "email";
	} else {
		return "phone";
	}
};

exports.userDataResponse = (user) => {
	let data = {};
	data.user = {
		_id: user._id,
		username: user.username,
		name: user.name,
		email: user.email,
		slug: user.slug,
		avatar: user.avatar,
		cover: user.cover,
		bio: user.bio,
		level: user.level,
		birthday: user.birthday,
		phone: user.phone,
		sCoin: user.sCoin,
		sExp: user.sExp,
		language: user.language,
		status: user.status,
	};
	data.token = this.signToken(user._id, 1440);
	return data;
};
