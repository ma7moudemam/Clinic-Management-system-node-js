const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const schema = new mongoose.Schema(
	{
		_id: Number,
		name: { type: String, required: true, unique: true },
		exp_date: { type: String, required: true },
		quantity: { type: Number, required: true },
		describtion: { type: String, required: true },
	},
	{ _id: false }
);

schema.plugin(autoIncrement, { id: "medicineAutoIncrement", inc_field: "_id" });
module.exports = mongoose.model("medicine", schema);
