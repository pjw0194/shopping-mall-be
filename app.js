const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // req.body is recognized as an object

app.use("/api", indexRouter);

const mogoURI = process.env.LOCAL_DB_ADDRESS;
mongoose
	.connect(mogoURI)
	.then(() => console.log("mongoose connected"))
	.catch((err) => console.log("DB connection failed", err));

app.listen(process.env.PORT || 5000, () => console.log("Server is on!!"));
