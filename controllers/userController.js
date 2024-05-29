const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {};

userController.createUser = async (req, res) => {
	try {
		const { email, password, name, level } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new Error("User already exists");
		} else {
			const salt = bcrypt.genSaltSync(10);
			const hashed = await bcrypt.hash(password, salt);

			const newUser = new User({
				email,
				password: hashed,
				name,
				level: level ? level : "customer",
			});

			await newUser.save();
			return res.status(200).json({ status: "ok" });
		}
	} catch (err) {
		res.status(400).json({ status: "fail", message: err.message });
	}
};

module.exports = userController;
