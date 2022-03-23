const express = require("express");
const controller = require("../Controllers/userController");
const router = express.Router();
const { body, query, param } = require("express-validator")
const Auth = require('../Middlewares/authMW');

router.route("/user")
    .get(controller.getAllUsers)
    

router.get("/user/profile",Auth, controller.getUserById)    


router.put("/user/:id", controller.updateUser)
router.delete("/user/:id", controller.deleteUser)
router.get('/user/role',controller.getUserByRole )

module.exports = router;