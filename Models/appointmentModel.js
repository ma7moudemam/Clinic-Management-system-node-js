const { mongoose } = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const appointment = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
    doctors: [{ type: Number, ref: "doctors" }],
    patient: [{ type: Number, ref: "patients" }],
    clinic: [{ type: Number, ref: "clinics"}],
    location: [{ type: String, required: true }],
    date:[{type:Date, required:true}],
}, { _id: false });

appointment.plugin(autoIncrement, { id: "appointmentAutoIncrement", inc_field: "_id" })
module.exports = mongoose.model("appointments", appointment);