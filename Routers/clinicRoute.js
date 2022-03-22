const express = require("express");
const { body } = require("express-validator");
const controller = require("../Controllers/ClinicController");
const router = express.Router();

router.route("/clinics")
    .get(controller.getAllClinics)
    .post([
        body("name").isString().withMessage("name is required and should be a text"),
        body("email").isEmail().withMessage("email is required"),
        body("password").isString().withMessage("password is required"),// min 5
        body("doctors").isArray().withMessage("doctors is an array of numbers"),
        body("patients").isArray().withMessage("patients is an array of numbers"),
        body("appointments").isArray().withMessage("appointments is an array of numbers"),
        body("employees").isArray().withMessage("employees is an array of numbers"),
        body("location").isArray().withMessage("location is an array of numbers"),
        body("phone_number").isInt({ min: 11, max: 11 }).withMessage("phone number should 11 number"),
        body("rooms").isInt().withMessage("rooms should be a number"),
        body("empty_rooms").isInt().withMessage("empty rooms is a number")
    ], controller.addClinic)
    .put(controller.updateClinic)
    .delete(controller.deleteClinic);

router.get("/clinics/:id", controller.getClinic);
router.put("/clinics/:id", controller.addNewProp);
router.delete("/clinics/:id", controller.deleteClinic);

module.exports = router;