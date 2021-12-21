require("dotenv").config();
const express = require("express");
const db = require("./configs/db");
const morgan = require("morgan");
const cors = require("cors");
db();
const app = express();
const user = require("./routes/user");
const level = require("./routes/level");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10000" }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", user);
app.use("/api/v1/level", level);
app.use(errorHandler);

app.get("*", (_req, res) => {
	res.send("Hello World!");
});
app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});
