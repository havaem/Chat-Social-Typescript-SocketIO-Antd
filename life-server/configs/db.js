const mongoose = require("mongoose");
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			autoIndex: true, //make this also true
		});
		console.log("Connect db successfully");
	} catch (error) {
		process.exit(1);
	}
};
module.exports = connectDB;
