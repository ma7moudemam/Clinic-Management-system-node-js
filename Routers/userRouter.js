const express = require("express");
const controller = require("../Controllers/userController");
const router = express.Router();
const { body, query, param } = require("express-validator")

router.route("/user")
    .get(controller.getAllUsers)


router.put("/user/:id", controller.updateUser)
router.delete("/user/:id", controller.deleteUser)
router.get('/user/role',controller.getUserByRole )

module.exports = router;