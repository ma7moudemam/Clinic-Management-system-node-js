const express = require("express");
const { body } = require("express-validator");
const controller = require("../Controllers/prescriptionsController");
const router = express.Router();

router.route("/prescriptions")
    .get(controller.getAllPrescriptions)
    .post([
        body("prescription_date").isString().withMessage("prescription date is required"),
        body("doctor_email").isEmail().withMessage("doctor's email is required"),
        body("patient_id").isInt().withMessage("patient id is required"),
        body("details").isString().withMessage("detials is missing"),
        body("drug").isInt().withMessage("drug id is required"),
        body("drug_dose").isString().withMessage("drug dose is required")
    ], controller.addPrescription)
    .delete(controller.deletePrescription);

router.get("/prescriptions/:id", controller.getPrescription)

module.exports = router;