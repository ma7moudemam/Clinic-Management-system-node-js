const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const schema = new mongoose.Schema(
	{
		_id: Number,
		user: { type: Number, ref: "patients", required: true },
	},
	{ _id: false }
);
