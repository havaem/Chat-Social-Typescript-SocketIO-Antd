const jwt = require("jsonwebtoken");
exports.currentUser = (req, res, next) => {
	const Authorization = req.header("authorization");
	if (!Authorization) {
		req.user = null;
		res.status(403).json({
			message: "Token is invalid or expired!",
		});
	} else {
		const token = Authorization.replace("Bearer ", "");
		try {
			const { data } = jwt.verify(token, process.env.APP_KEY_SECRET);
			req.user = { _id: data };
			next();
		} catch (err) {
			req.user = null;
			res.status(403).json({
				message: "Token is invalid or expired!",
			});
		}
	}
};
