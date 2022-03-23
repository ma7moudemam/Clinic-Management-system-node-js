const { mongoose } = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const clinic = new mongoose.Schema(
	{
		_id: Number,
		name: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		doctors: [{ type: Number, ref: "doctors" }],
		patients: [{ type: Number, ref: "patients" }],
		appointments: [{ type: Number, ref: "appointments" }],
		employees: [{ type: Number, ref: "employees" }],
		location: [{ type: String, required: true }],
		phone_numbers: [{ type: Number, unique: true, required: true }],
		rooms: { type: Number, required: true },
		empty_rooms: { type: Number, required: true },
		image: String,
	},
	{ _id: false }
);

clinic.plugin(autoIncrement, { id: "clinicAutoIncrement", inc_field: "_id" });
module.exports = mongoose.model("clinics", clinic);
