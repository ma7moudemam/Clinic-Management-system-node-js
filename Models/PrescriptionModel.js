const { mongoose, mongo } = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const prescription = new mongoose.Schema({
    _id: Number,
    prescription_date: { type: String, required: true },
    // doctor population should by email
    // to easily taking it from the req.email while posting a new prescription
    doctor_email: { type: String, ref: "doctors", required: true },
    patient_id: { type: Number, ref: "patients", required: true },
    clinic_id: { type: Number, ref: "clinics", required: true },
    details: { type: String, required: true },
    drug: { type: Number, ref: "medicines", required: true },
    drug_dose: { type: String, required: true }
}, { _id: false });

prescription.plugin(autoIncrement, { id: "prescriptionAutoIncrement", inc_field: "_id" });
module.exports = mongoose.model("prescriptions", prescription)