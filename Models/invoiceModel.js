const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema(
	{
		_id: Number,
        price: {
            type: Number
        },
        date: { type: Date, default: Date.now },
        payment: [{
            type: String
        }],
        patient_id: [{
            type: Number,
            ref : "patient"
        }],
	},
	{ _id: false }
);

schema.plugin(autoIncrement, { id: "invoice-auto-increament", inc_field: "_id" });
module.exports = mongoose.model("invoice", schema);
