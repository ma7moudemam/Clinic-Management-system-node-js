const { mongoose } = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const appointment = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
    user: [{ type: Number, ref: "user" }],
    clinic: [{ type: Number, ref: "clinics"}],
    date:[{type:String, required:true}],
}, { _id: false });

appointment.plugin(autoIncrement, { id: "appointmentAutoIncrement", inc_field: "_id" })
module.exports = mongoose.model("appointments", appointment);