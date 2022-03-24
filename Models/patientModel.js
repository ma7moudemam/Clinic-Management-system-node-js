const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema(
	{
		_id: Number,
        name: {
            type: String,
            required: true,
            // unique: true
        },
        gender: {
            type: String,
            required: true
        },
        age: {
            type : Number
        },
        location: {
            governorate : {type: String}
        },
        invoice_id: [
			{
				type: Number,
				ref: "invoice",
			},
		],
	},
	{ _id: false }
);

schema.statics.statistic = async function () {
	let female = 0;
	let male = 0;
    const males = await this.find({"gender":"F"})
    const females = await this.find({"gender":"M"})

    female = females.length
    male = males.length

	return {male , female} ;
};

schema.plugin(autoIncrement, { id: "patients-auto-increament", inc_field: "_id" });
module.exports = mongoose.model("patient", schema);

