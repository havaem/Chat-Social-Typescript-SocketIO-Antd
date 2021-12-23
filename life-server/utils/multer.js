const multer = require("multer");
module.exports = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
			cb(new Error("Only png and jpeg images are allowed"));
		}
		cb(null, true);
	},
});
