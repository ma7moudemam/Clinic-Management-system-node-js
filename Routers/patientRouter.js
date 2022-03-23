const express = require("express");
const router = express.Router();
const patientControllers = require("./../Controllers/patientController");

router.post("/", patientControllers.createPatient);
router.get("/", patientControllers.getPatientProfile); 
router.patch("/", patientControllers.updatePatientProfile);
router.delete("/", patientControllers.deletePatient); 

router.get("/filter", patientControllers.filterPatients);
router.get("/sort", patientControllers.sortPatients); 

module.exports = router;
