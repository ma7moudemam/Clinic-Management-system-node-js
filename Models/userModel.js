const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema(
	{
		_id: Number,
		name: {
			type: String,
			required: true
		},
		image: {
			type: String,
            required: true
		},
        email: {
			type: String,
            required: true
		},
        password:{
			type: String,
            required: true
		},
        role: {
            type: String,
            enum: ["patient", "doctor", "employee","admin"],
        },
        speciality:String,
        hourRate: Number,
		phoneNumber:Number,

	},
	{ _id: false }
);

schema.plugin(autoIncrement, { id: "userAutoIncrement", inc_field: "_id" });

module.exports = mongoose.model("user", schema);
