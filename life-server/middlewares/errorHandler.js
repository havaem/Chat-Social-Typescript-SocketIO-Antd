exports.errorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	if (err.errors && Object.keys(err.errors).length > 0) {
		err.statusCode = 400; //Bad request
		err.message = [];
		for (const [key, value] of Object.entries(err.errors)) {
			err.message.push(value.message);
		}
	}
	if (err.code === 11000) {
		err.statusCode = 400; //Bad request
		console.log("err.keyValue: ", err.keyValue);
		for (let p in err.keyValue) {
			err.message = `${capitalizeFirstLetter(p)} is exist!`;
		}
	}

	res.status(err.statusCode).json({
		message: err.message,
	});
};

// hàm upcase chữ đầu
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
