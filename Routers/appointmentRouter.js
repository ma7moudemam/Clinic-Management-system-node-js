const express = require("express");
const { body } = require("express-validator");
const controller = require("../Controllers/appointmentController");
const router = express.Router();

router.route("/appointment")
    .get(controller.getAllAppointments)
    .post([
        body("name").isString().withMessage("name is required and should be a text"),
        body("doctors").isArray().withMessage("doctors is an array of numbers"),
        body("patients").isArray().withMessage("patients is an array of numbers"),
        body("clinic").isArray().withMessage("appointments is an array of numbers"),
        body("employees").isArray().withMessage("employees is an array of numbers"),
        body("location").isArray().withMessage("location is an array of numbers"),
    ], controller.addAppointment)
    .put(controller.updateAppointment)
    .delete(controller.deleteAppointment);

router.get("/appointment/:id", controller.getAppointment);

module.exports = router;