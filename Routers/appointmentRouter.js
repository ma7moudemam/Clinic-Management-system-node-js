const express = require("express");
const { body } = require("express-validator");
const controller = require("../Controllers/appointmentController");
const router = express.Router();

router.route("/appointment")
    .get(controller.getAllAppointments)
    .post([
        body("name").isString().withMessage("name is required and should be a text"),
        body("clinic").isArray().withMessage("appointments is an array of numbers"),
    ], controller.addAppointment)
    .put(controller.updateAppointment)
    .delete(controller.deleteAppointment);

router.get("/appointment/:id", controller.getAppointment);
router.get("/report", controller.getAppointmentReport)

module.exports = router;