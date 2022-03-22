const Prescription = require("./../Models/PrescriptionModel");
const errHandler = require("./errorHandeler");

exports.getAllPrescriptions = (req, res, next) => {
    if (req.role === "doctor") {

        Prescription.find({ doctor: req.email })
            .populate({ path: "doctor_email" })
            .populate({ path: "patient_email" })
            .populate({ path: "clinic_email" })
            .populate({ path: "drug" })
            .then(data => {
                if (data == null) throw new Error("you didn't add any prescriptions!")
                res.status(200).json(data)
            })
            .catch(err => next(err))
    }
}

exports.getPrescription = (req, res, next) => {
    if (req.role === "doctor") {
        // doctor population should by email
        // to easily taking it from the req.email while posting a new prescription
        Prescription.findOne({ _id: req.params.id })
            .populate({ path: "doctor_email" })
            .populate({ path: "patient_id" })
            .populate({ path: "clinic_id" })
            .populate({ path: "drug" })
            .then(data => {
                if (data == null) throw new Error("this prescription is not found")
                res.status(200).json(data)
            })
            .catch(err => next(err))
    }
}

exports.addPrescription = (req, res, next) => {

    if (req.role === "doctor") {
        errHandler(req);
        let newPrescription = new Prescription({
            Prescription_date: new Date().toDateString("en-US",
                {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                }),
            doctor_email: req.email,
            patient_email: req.body.patient_id,
            clinic_id: req.body.clinic_id,
            details: req.body.details,
            drug: req.body.drug,
            drug_dose: req.body.drug_dose
        });

        newPrescription.save()
            .then(data => {
                if (data == null) throw new Error("something went wrong while adding new prescription")
                res.status(201).json({ message: "added", data })
            })
    }
}

// no one can edit a prescription 
// doctors can delete a prescription after 5 months of prescription date
exports.deletePrescription = (req, res, next) => {
    if (req.role === "doctor") {
        Prescription.findOne({ _id: req.body.id })
            .then(data => {
                let oldDateMonth = data.Prescription_date.split("/");
                let currentMonth = new Date().toLocaleString("en-us", { month: "numeric" })
                if (currentMonth - oldDateMonth >= 5) {
                    Prescription.deleteOne({ _id: req.body.id })
                        .then(data => {
                            if (data == null) throw new Error("prescription is not found")
                            res.status(200).json({ message: "delted", data })
                        })
                        .catch(err => next(err))
                }
            })
    }
}