const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const controller = require("../Controllers/medicineController.js");

router
	.route("/medicine")
	.get(controller.getMedicine)
	.post(controller.addMedicine)
	.put(controller.updateMedicine)
	.delete(controller.deleteMedicine);

module.exports = router;
