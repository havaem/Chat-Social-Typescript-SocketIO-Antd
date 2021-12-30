require("dotenv").config();
const express = require("express");
const db = require("./configs/db");
const morgan = require("morgan");
const cors = require("cors");
db();
const app = express();
const user = require("./routes/user");
const level = require("./routes/level");
const image = require("./routes/image");
const social = require("./routes/social");
const role = require("./routes/role");
const conversation = require("./routes/conversation");
const message = require("./routes/message");
const { errorHandler } = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3000;
const io = require("socket.io")(5001, {
	cors: {
		origin: "*",
	},
});
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10000" }));
app.use(express.urlencoded({ extended: true }));

// const Message = require("./models/message");
const User = require("./models/User");
let users = [];
const getUserInfo = async (userId) => {
	const user = await User.findOne({ _id: userId });
	return user;
};
const addUser = async (userId, socketId) => {
	if (!users.find((user) => user.userId === userId)) {
		users.push({ userId, socketId });
		let user = await getUserInfo(userId);
		io.emit("joinUser", user.name);
	}
	io.emit("getUsers", users);
};
const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};
const removeUserId = (userId) => {
	users = users.filter((user) => user._id !== userId);
};
io.on("connection", (socket) => {
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
	});
	//sendMessage
	socket.on("sendMessagePublicRoom", (data) => {
		io.emit("newMessagePublicRoom", data);
	});
	socket.on("updateConversation", (data) => {
		io.emit("newConversation", data);
	});
	socket.on("clearMessageAll", () => {
		io.emit("newMessageData");
	});
	socket.on("disconnect", (userId) => {
		if (userId) {
			removeUserId(userId);
			io.emit("getUsers", users);
		} else {
			removeUser(socket.id);
			io.emit("getUsers", users);
		}
	});
});

app.use("/api/v1/social", social);
app.use("/api/v1/user", user);
app.use("/api/v1/level", level);
app.use("/api/v1/image", image);
app.use("/api/v1/role", role);
app.use("/api/v1/conversation", conversation);
app.use("/api/v1/message", message);
app.use(errorHandler);

app.get("*", (_req, res) => {
	res.send("Hello World!");
});
app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
	console.log(`Chat listening at http://localhost:5001`);
});
